import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  Method,
  AxiosResponse,
} from 'axios';
import {RequestHandler, RequestResult, Request} from './core';

export type AxiosRequestHandlerExecuteConfig = {
  axiosRequestConfig?: AxiosRequestConfig;
  ignoreGeneralAxiosRequestConfig?: boolean;
  onUploadProgress?: (progress: number) => void;
};

type RequestIdToCancelTokenSourceMapping = {
  [requestId: string]: CancelTokenSource;
};

export class AxiosRequestHandler implements RequestHandler {
  private readonly generalRequestConfig: AxiosRequestConfig;
  private readonly cancelTokenSourceByPendingRequestId: RequestIdToCancelTokenSourceMapping;

  constructor(generalRequestConfig: AxiosRequestConfig = {}) {
    this.generalRequestConfig = generalRequestConfig;
    this.cancelTokenSourceByPendingRequestId = {};
    this.execute = this.execute.bind(this);
    this.createRequestResult = this.createRequestResult.bind(this);
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
    return new Promise(resolve => {
      axios(axiosRequestCfg)
        .then((response): void => {
          delete cancelTokenSourceByPendingRequestId[request.id];
          const requestResult = this.createRequestResult(
            request,
            response,
            false
          );
          resolve(requestResult);
        })
        .catch((error): void => {
          delete cancelTokenSourceByPendingRequestId[request.id];
          if (axios.isCancel(error)) {
            const requestResult = this.createRequestResult(request, null, true);
            resolve(requestResult);
            return;
          }
          if (!error.request) {
            console.error(error);
            throw new Error('unexpected axios error above');
          }
          const requestResult = this.createRequestResult(
            request,
            error.response,
            false
          );
          resolve(requestResult);
        });
    });
  }

  private createRequestResult(
    request: Request,
    response: null | AxiosResponse,
    hasRequestBeenCancelled: boolean
  ): RequestResult {
    return {
      hasRequestBeenCancelled,
      request,
      response: !response
        ? null
        : {
            status: response.status,
            headers: response.headers,
            body: response.data,
          },
    };
  }

  private createAxiosRequestConfig(
    request: Request,
    config?: AxiosRequestHandlerExecuteConfig
  ): AxiosRequestConfig {
    const requestConfig: AxiosRequestConfig = {
      ...(config?.ignoreGeneralAxiosRequestConfig
        ? {}
        : this.generalRequestConfig),
      method: request.endpointId.method as Method,
      url: request.url,
    };
    if (request.headers) {
      requestConfig.headers = request.headers;
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
    return {
      ...requestConfig,
      ...(config?.axiosRequestConfig ?? {}),
    };
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
      cancelTokenSource.cancel();
      delete this.cancelTokenSourceByPendingRequestId[requestId];
    }
  }
}
