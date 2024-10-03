import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  Method,
  AxiosResponse,
  AxiosHeaders,
  AxiosInstance,
} from 'axios';
import {
  ResponseHeaders,
  RequestHandler,
  RequestResult,
  Request,
  Response as CoreResponse,
  ResponseSetCookies,
  ResponseBody,
  EndpointSchema,
  findMatchingSchemaContentType,
  PlainObject,
} from './core';

class ResultResponse implements CoreResponse {
  private readonly response: AxiosResponse;
  private readonly urlDecodeQueryString: (queryString: string) => PlainObject;

  public readonly status: number;
  public readonly contentType: null | string;
  public readonly headers: ResponseHeaders;
  public readonly cookies: ResponseSetCookies;

  constructor(
    response: AxiosResponse,
    urlDecodeQueryString: (queryString: string) => PlainObject,
    endpointSchema: EndpointSchema
  ) {
    this.response = response;
    this.urlDecodeQueryString = urlDecodeQueryString;
    this.status = response.status;
    const plainHeaders = ResultResponse.createPlainHeaders(response);
    this.headers = plainHeaders;
    this.contentType = ResultResponse.findMatchingSchemaContentType(
      response.status,
      plainHeaders,
      endpointSchema
    );
    this.cookies = ResultResponse.createPlainCookies(response);
    this.revealBody = this.revealBody.bind(this);
    this.revealBodyAsArrayBuffer = this.revealBodyAsArrayBuffer.bind(this);
    this.findHeaderValue = this.findHeaderValue.bind(this);
  }

  revealBodyAsArrayBuffer(): Promise<ArrayBuffer> {
    return new Promise(resolve => {
      resolve(this.response.data);
    });
  }

  revealBody(): Promise<ResponseBody> {
    // this.response.data is always an ArrayBuffer since, Axios' RequestInit.responseType was set to "arraybuffer"
    const contentType = this.findHeaderValue('content-type');
    if (!contentType) {
      return new Promise(resolve => {
        resolve(new Blob([this.response.data]));
      });
    }
    const ct = contentType.trim().toLowerCase();
    if (ct.startsWith('text/')) {
      return new Promise(resolve => {
        const str = new TextDecoder(this.getContentTypeCharset()).decode(
          this.response.data
        );
        return resolve(str);
      });
    }
    if (ct.match(/application\/[^+]*[+]?(json);?.*/)) {
      return new Promise(resolve => {
        const str = new TextDecoder(this.getContentTypeCharset()).decode(
          this.response.data
        );
        const jsonObj = JSON.parse(str);
        return resolve(jsonObj);
      });
    }
    if (ct.match(/application\/x-www-form-urlencoded;?.*/)) {
      return new Promise(resolve => {
        const str = new TextDecoder(this.getContentTypeCharset()).decode(
          this.response.data
        );
        return resolve(this.urlDecodeQueryString(str));
      });
    }
    if (ct.match(/multipart\/form-data;?.*/)) {
      return new Promise(resolve => {
        const nativeResponse = new Response(this.response.data, {
          headers: this.headers,
          status: this.response.status,
          statusText: this.response.statusText,
        });
        return resolve(nativeResponse.formData());
      });
    }
    return new Promise(resolve => {
      resolve(new Blob([this.response.data]));
    });
  }

  private getContentTypeCharset(): string {
    const ctHeaderValue = this.findHeaderValue('content-type');
    if (!ctHeaderValue) {
      return 'utf-8';
    }
    const charsetRegex = /charset=([^()<>@,;:"/[\]?.=\s]*)/i;
    return charsetRegex.exec(ctHeaderValue)?.[1] ?? 'utf-8';
  }

  private findHeaderValue(name: string): null | string {
    const key = Object.keys(this.headers).find(
      k => k.toLowerCase() === name.toLowerCase()
    );
    if (!key) {
      return null;
    }
    return this.headers[key];
  }

  private static findMatchingSchemaContentType(
    actualStatus: number,
    plainHeaders: Record<string, string>,
    endpointSchema: EndpointSchema
  ): string | null {
    const actualContentTypeKey = Object.keys(plainHeaders).find(
      key => key.toLowerCase() === 'content-type'
    );
    if (!actualContentTypeKey) {
      return null;
    }
    const actualContentType = plainHeaders[actualContentTypeKey];
    return findMatchingSchemaContentType(
      actualStatus,
      actualContentType,
      endpointSchema
    );
  }

  private static createPlainHeaders(
    axiosResponse: AxiosResponse
  ): ResponseHeaders {
    const stringHeaders =
      axiosResponse.headers instanceof AxiosHeaders
        ? axiosResponse.headers.toJSON(true)
        : axiosResponse.headers;
    const plainHeaders: ResponseHeaders = {};
    for (const headerName in stringHeaders) {
      const headerValue = stringHeaders[headerName];
      if (typeof headerValue === 'string') {
        plainHeaders[headerName] = headerValue;
      }
    }
    return plainHeaders;
  }

  private static createPlainCookies(
    axiosResponse: AxiosResponse
  ): ResponseSetCookies {
    const setCookieHeaders = axiosResponse.headers['set-cookie'];
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
}

export type AxiosRequestHandlerExecutionConfig = {
  refineAxiosRequestConfig?: (
    preparedConfig: AxiosRequestConfig
  ) => AxiosRequestConfig;
};

type CancelTokenSourceByRequestIdMap = {
  [requestId: string]: CancelTokenSource;
};

type AxiosRequestHandlerConfig = {
  axios: AxiosInstance;
  urlDecodeQueryString: (queryString: string) => PlainObject;
};

export class AxiosRequestHandler implements RequestHandler {
  private readonly config: AxiosRequestHandlerConfig;
  private readonly cancelTokenSourceByPendingRequestId: CancelTokenSourceByRequestIdMap;

  constructor(config: AxiosRequestHandlerConfig) {
    this.config = config;
    this.cancelTokenSourceByPendingRequestId = {};
    this.execute = this.execute.bind(this);
    this.getRequestConfigCookieHeaders =
      this.getRequestConfigCookieHeaders.bind(this);
    this.createPlainRequestHeaders = this.createPlainRequestHeaders.bind(this);
    this.createRequestConfig = this.createRequestConfig.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  execute(
    request: Request,
    config?: AxiosRequestHandlerExecutionConfig
  ): Promise<RequestResult> {
    const cancelTokenSource = axios.CancelToken.source();
    const cancelTokenSourceByPendingRequestId =
      this.cancelTokenSourceByPendingRequestId;
    const axiosRequestCfg: AxiosRequestConfig = {
      ...this.createRequestConfig(request, config),
      cancelToken: cancelTokenSource.token,
      responseType: 'arraybuffer',
    };
    cancelTokenSourceByPendingRequestId[request.id] = cancelTokenSource;
    return new Promise((resolve, reject) => {
      this.config.axios
        .request(axiosRequestCfg)
        .then((response): void => {
          resolve({
            hasRequestBeenCancelled: false,
            request,
            response: new ResultResponse(
              response,
              this.config.urlDecodeQueryString,
              request.endpointSchema
            ),
          });
        })
        .catch((error): void => {
          if (!error.request) {
            reject({
              hasRequestBeenCancelled: false,
              request,
              response: error.response
                ? new ResultResponse(
                    error.response,
                    this.config.urlDecodeQueryString,
                    request.endpointSchema
                  )
                : null,
              error: error,
            });
            return;
          }
          resolve({
            hasRequestBeenCancelled: axios.isCancel(error),
            request,
            response: error.response
              ? new ResultResponse(
                  error.response,
                  this.config.urlDecodeQueryString,
                  request.endpointSchema
                )
              : null,
            error: error,
          });
        })
        .finally(() => {
          delete cancelTokenSourceByPendingRequestId[request.id];
        });
    });
  }

  cancelRequestById(requestId: string) {
    const cancelTokenSource =
      this.cancelTokenSourceByPendingRequestId[requestId];
    if (cancelTokenSource) {
      cancelTokenSource.cancel();
    }
  }

  cancelAllRequests() {
    for (const requestId in this.cancelTokenSourceByPendingRequestId) {
      const cancelTokenSource =
        this.cancelTokenSourceByPendingRequestId[requestId];
      if (cancelTokenSource) {
        cancelTokenSource.cancel();
      }
    }
  }

  private createRequestConfig(
    request: Request,
    config?: AxiosRequestHandlerExecutionConfig
  ): AxiosRequestConfig {
    const requestCfg: AxiosRequestConfig = {
      method: request.endpointSchema.method as Method,
      url: request.url,
    };
    requestCfg.headers = this.createPlainRequestHeaders(request);
    if (request.body) {
      requestCfg.data = request.body;
    }
    if (request.queryParams) {
      requestCfg.params = request.queryParams;
    }
    if (!config?.refineAxiosRequestConfig) {
      return requestCfg;
    }
    return config.refineAxiosRequestConfig(requestCfg);
  }

  private createPlainRequestHeaders(request: Request): Record<string, string> {
    const requestHeaders: Record<string, string> = {};
    if (request.headers) {
      Object.keys(request.headers).forEach(key => {
        const value = request.headers![key];
        if (typeof value === 'string' || typeof value === 'number') {
          requestHeaders[key] = `${value}`;
        }
      });
    }
    const cookieHeaders = request.cookies
      ? this.getRequestConfigCookieHeaders(request)
      : {};
    const mergedHeaders: Record<string, string> = {
      ...requestHeaders,
      ...cookieHeaders,
    };
    if (request.contentType) {
      mergedHeaders['content-type'] = request.contentType;
    }
    return mergedHeaders;
  }

  private getRequestConfigCookieHeaders(
    request: Request
  ): Record<string, string> {
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
      return {};
    }
    return {
      Cookie: cookieDefinitions.join('; '),
    };
  }
}
