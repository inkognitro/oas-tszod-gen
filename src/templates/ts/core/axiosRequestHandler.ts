import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  Method,
  AxiosResponse,
  AxiosHeaders,
  RawAxiosRequestHeaders,
} from 'axios';
import {
  RequestHandler,
  RequestResult,
  Request,
  Response as CoreResponse,
  ResponseSetCookies,
} from './core';

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
  private readonly generalRequestConfig: AxiosRequestConfig;
  private readonly cancelTokenSourceByPendingRequestId: CancelTokenSourceByRequestIdMap;

  constructor(generalRequestConfig: AxiosRequestConfig = {}) {
    this.generalRequestConfig = generalRequestConfig;
    this.cancelTokenSourceByPendingRequestId = {};
    this.execute = this.execute.bind(this);
    this.createAxiosRequestConfig = this.createAxiosRequestConfig.bind(this);
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
      ...this.createAxiosRequestConfig(request, config),
      cancelToken: cancelTokenSource.token,
    };
    cancelTokenSourceByPendingRequestId[request.id] = cancelTokenSource;
    return new Promise((resolve, reject) => {
      axios(axiosRequestCfg)
        .then((response): void => {
          resolve({
            hasRequestBeenCancelled: false,
            request,
            response: this.createCoreResponse(response),
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
                ? this.createCoreResponse(error.response)
                : null,
              error: error,
            });
            return;
          }
          resolve({
            hasRequestBeenCancelled: false,
            request,
            response: error.response
              ? this.createCoreResponse(error.response)
              : null,
            error: error,
          });
        })
        .finally(() => {
          delete cancelTokenSourceByPendingRequestId[request.id];
        });
    });
  }

  private createCoreResponse(axiosResponse: AxiosResponse): CoreResponse {
    return {
      statusCode: axiosResponse.status,
      headers: axiosResponse.headers,
      body: axiosResponse.data,
      cookies: this.createCoreResponseCookies(axiosResponse),
    };
  }

  private createCoreResponseCookies(
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

  private findAxiosRequestConfigCookieHeaders(
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

  private createAxiosRequestConfigHeaders(
    requestConfig: AxiosRequestConfig,
    request: Request
  ): RawAxiosRequestHeaders {
    const currentHeaders: RawAxiosRequestHeaders | undefined =
      requestConfig.headers instanceof AxiosHeaders
        ? requestConfig.headers.toJSON()
        : request.headers;
    const cookieHeaders = request.cookies
      ? this.findAxiosRequestConfigCookieHeaders(request)
      : {};
    return {
      ...(currentHeaders ?? {}),
      ...(request.headers ?? {}),
      ...cookieHeaders,
    };
  }

  private createAxiosRequestConfig(
    request: Request,
    config?: AxiosRequestHandlerExecuteConfig
  ): AxiosRequestConfig {
    const requestConfig: AxiosRequestConfig = {
      ...this.generalRequestConfig,
      method: request.endpointId.method as Method,
      url: request.url,
    };
    if (request.headers) {
      requestConfig.headers = this.createAxiosRequestConfigHeaders(
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

  cancelRequestById(requestId: string) {
    const cancelTokenSource =
      this.cancelTokenSourceByPendingRequestId[requestId];
    if (!cancelTokenSource) {
      return;
    }
    cancelTokenSource.cancel();
    delete this.cancelTokenSourceByPendingRequestId[requestId];
  }

  cancelAllRequests() {
    for (const requestId in this.cancelTokenSourceByPendingRequestId) {
      const cancelTokenSource =
        this.cancelTokenSourceByPendingRequestId[requestId];
      if (!cancelTokenSource) {
        return;
      }
      cancelTokenSource.cancel();
      delete this.cancelTokenSourceByPendingRequestId[requestId];
    }
  }
}
