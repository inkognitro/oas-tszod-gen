import {
  ResponseHeaders,
  QueryParams,
  Request,
  RequestHandler,
  RequestResult,
  Response as CoreResponse,
  ResponseBody,
  ResponseSetCookies,
  isJsonValue,
  EndpointSchema,
  findMatchingSchemaContentType,
} from './core';

function convertObjectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'string') {
      formData.append(key, value);
      continue;
    }
    if (typeof value === 'number') {
      formData.append(key, `${value}`);
      continue;
    }
    if (value instanceof Blob) {
      formData.append(key, value);
      continue;
    }
    if (typeof value === 'boolean') {
      formData.append(key, value ? '1' : '0');
      continue;
    }
    if (typeof value === 'object' && isJsonValue(value)) {
      formData.append(key, JSON.stringify(value));
    }
  }
  return formData;
}

class ResultResponse implements CoreResponse {
  private readonly response: Response;

  public readonly status: number;
  public readonly contentType: null | string;
  public readonly headers: ResponseHeaders;
  public readonly cookies: ResponseSetCookies;

  constructor(response: Response, endpointSchema: EndpointSchema) {
    this.response = response;
    this.status = response.status;
    this.headers = ResultResponse.createPlainHeaders(response);
    this.contentType = ResultResponse.findMatchingSchemaContentType(
      response,
      endpointSchema
    );
    this.cookies = ResultResponse.createPlainCookies(response);
    this.revealBody = this.revealBody.bind(this);
  }

  private static findMatchingSchemaContentType(
    response: Response,
    endpointSchema: EndpointSchema
  ): string | null {
    const actualContentType = response.headers.get('content-type');
    if (!actualContentType) {
      return null;
    }
    return findMatchingSchemaContentType(
      response.status,
      actualContentType,
      endpointSchema
    );
  }

  private static createPlainHeaders(response: Response): ResponseHeaders {
    const plainHeaders: ResponseHeaders = {};
    response.headers.forEach((header, headerKey) => {
      if (typeof header === 'string') {
        plainHeaders[headerKey] = header;
      }
    });
    return plainHeaders;
  }

  private static createPlainCookies(response: Response): ResponseSetCookies {
    const setCookieHeaders = response.headers.getSetCookie();
    if (!setCookieHeaders) {
      return {};
    }
    const cookies: ResponseSetCookies = {};
    setCookieHeaders.forEach(setCookieHeader => {
      const cookieName = setCookieHeader.split('=')[0];
      cookies[cookieName] = setCookieHeader;
    });
    return cookies;
  }

  revealBody(): Promise<ResponseBody> {
    const contentType = this.response.headers.get('content-type');
    if (!contentType) {
      return this.response.blob();
    }
    const ct = contentType.trim().toLowerCase();
    if (ct.startsWith('text/')) {
      return this.response.text();
    }
    if (ct.match(/application\/[^+]*[+]?(json);?.*/)) {
      return this.response.json();
    }
    if (
      ct.match(/multipart\/form-data;?.*/) ||
      ct.match(/application\/x-www-form-urlencoded;?.*/)
    ) {
      return this.response.formData();
    }
    return this.response.blob();
  }
}

type FetchApiRequestHandlerConfig = {
  stringifyQueryParams: (queryParams: QueryParams) => string;
  baseUrl?: string;
  generalRequestInit?: RequestInit;
};

type AbortControllerByRequestId = {
  [requestId: string]: AbortController;
};

export type FetchApiRequestHandlerExecutionConfig = {
  refineFetchApiRequestInit?: (preparedRequestInit: RequestInit) => RequestInit;
};

export class FetchApiRequestHandler implements RequestHandler {
  private readonly config: FetchApiRequestHandlerConfig;
  private readonly generalRequestInit: undefined | RequestInit;
  private readonly abortControllerByPendingRequestIds: AbortControllerByRequestId;

  constructor(
    config: FetchApiRequestHandlerConfig,
    generalRequestInit?: RequestInit
  ) {
    this.config = config;
    this.generalRequestInit = generalRequestInit;
    this.abortControllerByPendingRequestIds = {};
    this.execute = this.execute.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
    this.createRequestInit = this.createRequestInit.bind(this);
    this.createPlainRequestHeaders = this.createPlainRequestHeaders.bind(this);
    this.findRequestInitCookieHeaders =
      this.findRequestInitCookieHeaders.bind(this);
    this.createRequestBodyInit = this.createRequestBodyInit.bind(this);
  }

  public execute(
    request: Request,
    config?: FetchApiRequestHandlerExecutionConfig
  ): Promise<RequestResult> {
    const abortControllerByPendingRequestIds =
      this.abortControllerByPendingRequestIds;
    return new Promise(resolve => {
      const queryStrUrlPart =
        request.queryParams && Object.keys(request.queryParams).length
          ? `?${this.config.stringifyQueryParams(request.queryParams)}`
          : '';
      const abortController = new AbortController();
      abortControllerByPendingRequestIds[request.id] = abortController;
      const requestInit: RequestInit = {
        ...this.createRequestInit(request, config),
        signal: abortController.signal,
      };
      fetch(
        `${this.config.baseUrl}${request.url}${queryStrUrlPart}`,
        requestInit
      )
        .then(response => {
          resolve({
            request: request,
            response: new ResultResponse(response, request.endpointSchema),
            hasRequestBeenCancelled: abortController.signal.aborted,
          });
        })
        .catch(error => {
          resolve({
            request: request,
            response: error.response
              ? new ResultResponse(error.response, request.endpointSchema)
              : null,
            hasRequestBeenCancelled: abortController.signal.aborted,
            error: abortController.signal.aborted ? undefined : error,
          });
        })
        .finally(() => {
          delete abortControllerByPendingRequestIds[request.id];
        });
    });
  }

  cancelRequestById(requestId: string) {
    const controller = this.abortControllerByPendingRequestIds[requestId];
    if (controller) {
      controller.abort();
    }
  }

  cancelAllRequests() {
    for (const requestId in this.abortControllerByPendingRequestIds) {
      const controller = this.abortControllerByPendingRequestIds[requestId];
      if (controller) {
        controller.abort();
      }
    }
  }

  private createRequestInit(
    request: Request,
    config?: FetchApiRequestHandlerExecutionConfig
  ): RequestInit {
    const requestInit: RequestInit = {
      ...(this.generalRequestInit ? this.generalRequestInit : {}),
      method: request.endpointSchema.method,
    };
    const plainHeaders = this.createPlainRequestHeaders(requestInit, request);
    requestInit.headers = plainHeaders;
    if (request.body) {
      requestInit.body = this.createRequestBodyInit(plainHeaders, request);
    }
    if (!config?.refineFetchApiRequestInit) {
      return requestInit;
    }
    return config.refineFetchApiRequestInit(requestInit);
  }

  private findContentTypeFromPlainHeaders(
    plainHeaders: Record<string, string>
  ): string | null {
    const key = Object.keys(plainHeaders).find(
      key => key.toLowerCase() === 'content-type'
    );
    if (!key) {
      return null;
    }
    return plainHeaders[key] ?? null;
  }

  private getRequestBodyTransferFormat(
    plainHeaders: Record<string, string>,
    request: Request
  ): string | null {
    let ct = this.findContentTypeFromPlainHeaders(plainHeaders);
    if (!ct && this.isFormDataRequestContentType(request)) {
      return 'formData';
    }
    if (!ct) {
      return 'blob';
    }
    ct = ct.trim().toLowerCase();
    if (ct.startsWith('text/')) {
      return 'text';
    }
    if (ct.match(/application\/[^+]*[+]?(json);?.*/)) {
      return 'json';
    }
    if (
      ct.match(/multipart\/form-data;?.*/) ||
      ct.match(/application\/x-www-form-urlencoded;?.*/)
    ) {
      return 'formData';
    }
    return 'blob';
  }

  private createRequestBodyInit(
    plainHeaders: Record<string, string>,
    request: Request
  ): BodyInit | null {
    const format = this.getRequestBodyTransferFormat(plainHeaders, request);
    switch (format) {
      case 'json':
        if (!isJsonValue(request.body)) {
          throw new Error(
            `JsonValue expected but received request.body of type: ${typeof request.body}`
          );
        }
        return JSON.stringify(request.body);
      case 'formData':
        if (request.body instanceof FormData) {
          return request.body;
        }
        if (request.body && typeof request.body === 'object') {
          return convertObjectToFormData(request.body);
        }
        throw new Error(
          `FormData or Object was expected but received request.body of type: ${typeof request.body}`
        );
      case 'text':
        if (typeof request.body !== 'string') {
          throw new Error(
            `string expected but received request.body of type: ${typeof request.body}`
          );
        }
        return request.body;
      case 'blob':
      default:
        if (!request.body) {
          return null;
        }
        if (isJsonValue(request.body)) {
          throw new Error(
            'Blob expected but received request.body of type: JsonValue'
          );
        }
        return request.body ?? null;
    }
  }

  private createStringRequestHeaders(
    headersInit: HeadersInit
  ): Record<string, string> {
    const headers: Record<string, string> = {};
    if (Array.isArray(headersInit)) {
      throw new Error('headersInit array case is not supported');
    }
    if (headersInit.forEach) {
      Object.keys(headersInit).forEach((value, key) => {
        if (typeof value === 'string' || typeof value === 'number') {
          headers[key] = `${value}`;
        }
      });
      return headers;
    }
    Object.keys(headersInit).forEach((key: string) => {
      // @ts-ignore
      const value = headersInit[key];
      if (typeof value === 'string' || typeof value === 'number') {
        headers[key] = `${value}`;
      }
    });
    return headers;
  }

  private createPlainRequestHeaders(
    requestInit: RequestInit,
    request: Request
  ): Record<string, string> {
    const cookieHeaders = request.cookies
      ? this.findRequestInitCookieHeaders(request)
      : {};
    const requestInitHeaders = requestInit.headers
      ? this.createStringRequestHeaders(requestInit.headers)
      : {};
    const requestHeaders: Record<string, string> = {};
    for (const key in request.headers) {
      requestHeaders[key] = `${request.headers[key]}`;
    }
    const mergedHeaders: Record<string, string> = {
      ...requestInitHeaders,
      ...requestHeaders,
      ...cookieHeaders,
    };
    if (
      request.contentType &&
      !this.isFormDataRequestContentType(request) // this must be handled by fetch itself to succeed
    ) {
      mergedHeaders['content-type'] = request.contentType;
    }
    return mergedHeaders;
  }

  private isFormDataRequestContentType(request: Request): boolean {
    const ct = request.contentType?.toLowerCase();
    if (!ct) {
      return false;
    }
    return !!ct.match(/multipart\/form-data;?.*/);
  }

  private findRequestInitCookieHeaders(
    request: Request
  ): null | Record<string, string> {
    const currentCookieDefinition = request.headers?.['Cookie'];
    const cookieDefinitions: string[] = currentCookieDefinition
      ? [`${currentCookieDefinition}`]
      : [];
    if (request.cookies) {
      for (const cookieName in request.cookies) {
        const cookieValue = request.cookies[cookieName];
        cookieDefinitions.push(`${cookieName}=${cookieValue}`);
      }
    }
    if (!cookieDefinitions.length) {
      return null;
    }
    return {
      Cookie: cookieDefinitions.join('; '),
    };
  }
}
