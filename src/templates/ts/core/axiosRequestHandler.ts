import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  Method,
  AxiosResponse,
  AxiosHeaders,
  RawAxiosRequestHeaders,
  AxiosInstance,
} from 'axios';
import {
  Headers,
  RequestHandler,
  RequestResult,
  Request,
  Response as CoreResponse,
  ResponseSetCookies,
} from './core';

class ResultResponse implements CoreResponse {
  private readonly response: AxiosResponse;

  public readonly statusCode: number;
  public readonly headers: Headers;
  public readonly cookies: ResponseSetCookies;

  constructor(response: AxiosResponse) {
    this.response = response;
    this.statusCode = response.status;
    this.headers = this.createPlainHeaders(response);
    this.cookies = this.createPlainCookies(response);
    this.revealBody = this.revealBody.bind(this);
  }

  revealBody(): Promise<any> {
    return new Promise(resolve => resolve(this.response.data));
  }

  private createPlainHeaders(axiosResponse: AxiosResponse): Headers {
    const stringHeaders =
      axiosResponse.headers instanceof AxiosHeaders
        ? axiosResponse.headers.toJSON(true)
        : axiosResponse.headers;
    const plainHeaders: Headers = {};
    for (const headerName in stringHeaders) {
      const headerValue = stringHeaders[headerName];
      if (typeof headerValue === 'string') {
        plainHeaders[headerName] = headerValue;
      }
    }
    return plainHeaders;
  }

  private createPlainCookies(axiosResponse: AxiosResponse): ResponseSetCookies {
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

export type AxiosRequestHandlerExecuteConfig = {
  refineAxiosRequestConfig?: (
    preparedConfig: AxiosRequestConfig
  ) => AxiosRequestConfig;
  onUploadProgress?: (progress: number) => void;
};

type CancelTokenSourceByRequestIdMap = {
  [requestId: string]: CancelTokenSource;
};

export class AxiosRequestHandler implements RequestHandler {
  private readonly axiosInstance: AxiosInstance;
  private readonly generalRequestConfig: AxiosRequestConfig;
  private readonly cancelTokenSourceByPendingRequestId: CancelTokenSourceByRequestIdMap;

  constructor(
    axiosInstance: AxiosInstance,
    generalRequestConfig: AxiosRequestConfig = {}
  ) {
    this.axiosInstance = axiosInstance;
    this.generalRequestConfig = generalRequestConfig;
    this.cancelTokenSourceByPendingRequestId = {};
    this.execute = this.execute.bind(this);
    this.findRequestConfigCookieHeaders =
      this.findRequestConfigCookieHeaders.bind(this);
    this.createRequestConfigHeaders =
      this.createRequestConfigHeaders.bind(this);
    this.createRequestConfig = this.createRequestConfig.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  execute(
    request: Request,
    config?: AxiosRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    const cancelTokenSource = axios.CancelToken.source();
    const cancelTokenSourceByPendingRequestId =
      this.cancelTokenSourceByPendingRequestId;
    const axiosRequestCfg: AxiosRequestConfig = {
      ...this.createRequestConfig(request, config),
      cancelToken: cancelTokenSource.token,
    };
    cancelTokenSourceByPendingRequestId[request.id] = cancelTokenSource;
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(axiosRequestCfg)
        .then((response): void => {
          resolve({
            hasRequestBeenCancelled: false,
            request,
            response: new ResultResponse(response),
          });
        })
        .catch((error): void => {
          if (axios.isCancel(error)) {
            resolve({
              hasRequestBeenCancelled: true,
              request,
              response: null,
            });
            return;
          }
          if (!error.request) {
            reject({
              hasRequestBeenCancelled: false,
              request,
              response: error.response
                ? new ResultResponse(error.response)
                : null,
              error: error,
            });
            return;
          }
          resolve({
            hasRequestBeenCancelled: false,
            request,
            response: error.response
              ? new ResultResponse(error.response)
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
    config?: AxiosRequestHandlerExecuteConfig
  ): AxiosRequestConfig {
    const requestConfig: AxiosRequestConfig = {
      ...this.generalRequestConfig,
      method: request.endpointId.method as Method,
      url: request.url,
    };
    if (request.headers) {
      requestConfig.headers = this.createRequestConfigHeaders(
        requestConfig,
        request
      );
    }
    if (request.body) {
      requestConfig.data = request.body;
    }
    if (request.queryParams) {
      requestConfig.params = request.queryParams;
    }
    const onUploadProgress = config?.onUploadProgress;
    if (onUploadProgress) {
      requestConfig.onUploadProgress = progressEvent => {
        if (progressEvent.total === undefined) {
          return;
        }
        onUploadProgress(
          Math.round(progressEvent.loaded / progressEvent.total)
        );
      };
    }
    if (!config?.refineAxiosRequestConfig) {
      return requestConfig;
    }
    return config.refineAxiosRequestConfig(requestConfig);
  }

  private createRequestConfigHeaders(
    requestConfig: AxiosRequestConfig,
    request: Request
  ): RawAxiosRequestHeaders {
    const currentHeaders: RawAxiosRequestHeaders | undefined =
      requestConfig.headers instanceof AxiosHeaders
        ? requestConfig.headers.toJSON()
        : request.headers;
    const cookieHeaders = request.cookies
      ? this.findRequestConfigCookieHeaders(request)
      : {};
    return {
      ...(currentHeaders ?? {}),
      ...(request.headers ?? {}),
      ...cookieHeaders,
    };
  }

  private findRequestConfigCookieHeaders(
    request: Request
  ): null | RawAxiosRequestHeaders {
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
