import {
  Headers,
  Request,
  RequestHandler,
  RequestResult,
  Response as CoreResponse,
  ResponseBody,
  ResponseSetCookies,
} from './core';
import {stringify} from 'qs';

function getTransferFormatByContentType(
  contentType: string
): 'text' | 'json' | 'formData' | 'blob' {
  const ct = contentType.trim().toLowerCase();
  if (ct.startsWith('text/') || ct === 'application/x-www-form-urlencoded') {
    return 'text';
  }
  if (ct.match(/application\/[^+]*[+]?(json);?.*/)) {
    return 'json';
  }
  if (ct === 'multipart/form-data') {
    return 'formData';
  }
  return 'blob';
}

class ResultResponse implements CoreResponse {
  private readonly response: Response;

  public readonly status: number;
  public readonly headers: Headers;
  public readonly cookies: ResponseSetCookies;

  constructor(response: Response) {
    this.response = response;
    this.status = response.status;
    this.headers = this.createPlainHeaders(response);
    this.cookies = this.createPlainCookies(response);
    this.revealBody = this.revealBody.bind(this);
  }

  private createPlainHeaders(response: Response): Headers {
    const plainHeaders: Headers = {};
    response.headers.forEach((header, headerKey) => {
      if (typeof header === 'string') {
        plainHeaders[headerKey] = header;
      }
    });
    return plainHeaders;
  }

  private createPlainCookies(response: Response): ResponseSetCookies {
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
    const format = getTransferFormatByContentType(contentType);
    switch (format) {
      case 'json':
        return this.response.json();
      case 'text':
        return this.response.text();
      case 'formData':
        return this.response.formData();
      case 'blob':
      default:
        return this.response.blob();
    }
  }
}

type FetchApiRequestHandlerConfig = {
  baseUrl?: string;
  generalRequestInit?: RequestInit;
};

type AbortControllerByRequestId = {
  [requestId: string]: AbortController;
};

export type FetchApiRequestHandlerExecuteConfig = {
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
    this.createRequestInitHeaders = this.createRequestInitHeaders.bind(this);
    this.findRequestInitCookieHeaders =
      this.findRequestInitCookieHeaders.bind(this);
    this.createRequestInitBody = this.createRequestInitBody.bind(this);
  }

  public execute(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    const abortControllerByPendingRequestIds =
      this.abortControllerByPendingRequestIds;
    return new Promise(resolve => {
      const queryStrUrlPart =
        request.queryParams && Object.keys(request.queryParams).length
          ? `?${stringify(request.queryParams)}`
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
            response: new ResultResponse(response),
            hasRequestBeenCancelled: abortController.signal.aborted,
          });
        })
        .catch(error => {
          resolve({
            request: request,
            response: error.response
              ? new ResultResponse(error.response)
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
    config?: FetchApiRequestHandlerExecuteConfig
  ): RequestInit {
    const requestInit: RequestInit = {
      ...(this.generalRequestInit ? this.generalRequestInit : {}),
      method: request.endpointId.method,
    };
    let requestHeaders = {};
    if (request.headers) {
      requestHeaders = this.createRequestInitHeaders(requestInit, request);
      requestInit.headers = requestHeaders;
    }
    if (request.body) {
      requestInit.body = this.createRequestInitBody(requestHeaders, request);
    }
    if (!config?.refineFetchApiRequestInit) {
      return requestInit;
    }
    return config.refineFetchApiRequestInit(requestInit);
  }

  private createRequestInitBody(
    headers: Headers,
    request: Request
  ): string | FormData | Blob {
    const contentTypeHeaderKey = Object.keys(headers).find(
      key => key.toLowerCase() === 'content-type'
    );
    if (!contentTypeHeaderKey) {
      return request.body; // treat as Blob
    }
    const contentType = headers[contentTypeHeaderKey];
    if (!contentType) {
      return request.body; // treat as Blob
    }
    const format = getTransferFormatByContentType(contentType);
    switch (format) {
      case 'json':
        return JSON.stringify(request.body);
      case 'formData':
      case 'blob':
      case 'text':
      default:
        return request.body;
    }
  }

  private createRequestInitHeaders(
    requestConfig: RequestInit,
    request: Request
  ): HeadersInit {
    const cookieHeaders = request.cookies
      ? this.findRequestInitCookieHeaders(request)
      : {};
    return {
      ...(requestConfig.headers ?? {}),
      ...(request.headers ?? {}),
      ...cookieHeaders,
    };
  }

  private findRequestInitCookieHeaders(request: Request): null | HeadersInit {
    const currentCookieDefinition = request.headers?.['Cookie'];
    const cookieDefinitions: string[] = currentCookieDefinition
      ? [currentCookieDefinition]
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
