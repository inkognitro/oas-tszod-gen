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

function createRequestResult(
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

function createAxiosRequestConfig(
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
      onUploadProgress(Math.round(progressEvent.loaded / progressEvent.total));
    };
  }
  return requestConfig;
}

type RequestIdToCancelTokenSourceMapping = {
  [requestId: string]: CancelTokenSource;
};

export class AxiosRequestHandler implements RequestHandler {
  private readonly predefinedAxiosRequestConfig: AxiosRequestConfig;
  private readonly requestIdToCancelTokenSourceMapping: RequestIdToCancelTokenSourceMapping;

  constructor(predefinedAxiosRequestConfig: AxiosRequestConfig = {}) {
    this.predefinedAxiosRequestConfig = predefinedAxiosRequestConfig;
    this.requestIdToCancelTokenSourceMapping = {};
  }

  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult> {
    const cancelTokenSource = axios.CancelToken.source();
    const requestIdToCancelTokenSourceMapping =
      this.requestIdToCancelTokenSourceMapping;
    const axiosRequestCfg: AxiosRequestConfig = {
      ...createAxiosRequestConfig(
        this.predefinedAxiosRequestConfig,
        request,
        config
      ),
      cancelToken: cancelTokenSource.token,
    };
    requestIdToCancelTokenSourceMapping[request.id] = cancelTokenSource;
    return new Promise(resolve => {
      axios(axiosRequestCfg)
        .then((response): void => {
          delete requestIdToCancelTokenSourceMapping[request.id];
          const requestResult = createRequestResult(request, response, false);
          resolve(requestResult);
        })
        .catch((error): void => {
          delete requestIdToCancelTokenSourceMapping[request.id];
          if (axios.isCancel(error)) {
            const requestResult = createRequestResult(request, null, true);
            resolve(requestResult);
            return;
          }
          if (!error.request) {
            console.error(error);
            throw new Error('unexpected axios error above');
          }
          const requestResult = createRequestResult(
            request,
            error.response,
            false
          );
          resolve(requestResult);
        });
    });
  }

  cancelRequestById(requestId: string) {
    const cancelTokenSource =
      this.requestIdToCancelTokenSourceMapping[requestId];
    if (!cancelTokenSource) {
      return;
    }
    cancelTokenSource.cancel();
    delete this.requestIdToCancelTokenSourceMapping[requestId];
  }
}
