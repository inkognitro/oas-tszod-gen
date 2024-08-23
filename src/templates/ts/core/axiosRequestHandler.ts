import axios, {
  AxiosRequestConfig,
  CancelTokenSource,
  Method,
  AxiosResponse,
} from 'axios';
import {RequestHandler, RequestResult, Request} from './core';

interface RequestExecutionConfig {
  onUploadProgress?: (progress: number) => void;
}

type RequestIdToCancelTokenSourceMapping = {
  [requestId: string]: CancelTokenSource;
};

export class AxiosRequestHandler implements RequestHandler {
  private readonly predefinedAxiosRequestConfig: AxiosRequestConfig;
  private readonly cancelTokenSourceByPendingRequestId: RequestIdToCancelTokenSourceMapping;

  constructor(predefinedAxiosRequestConfig: AxiosRequestConfig = {}) {
    this.predefinedAxiosRequestConfig = predefinedAxiosRequestConfig;
    this.cancelTokenSourceByPendingRequestId = {};
    this.execute = this.execute.bind(this);
    this.createRequestResult = this.createRequestResult.bind(this);
    this.createAxiosRequestConfig = this.createAxiosRequestConfig.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult> {
    const cancelTokenSource = axios.CancelToken.source();
    const cancelTokenSourceByPendingRequestId =
      this.cancelTokenSourceByPendingRequestId;
    const axiosRequestCfg: AxiosRequestConfig = {
      ...this.createAxiosRequestConfig(
        this.predefinedAxiosRequestConfig,
        request,
        config
      ),
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
    predefinedConfig: AxiosRequestConfig,
    request: Request,
    config?: RequestExecutionConfig
  ): AxiosRequestConfig {
    const requestConfig: AxiosRequestConfig = {
      ...predefinedConfig,
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
    return requestConfig;
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
