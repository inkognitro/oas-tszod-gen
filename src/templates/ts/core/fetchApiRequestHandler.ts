import {
  Headers,
  Request,
  RequestHandler,
  RequestResult,
  Response as CoreResponse,
  ResponseSetCookies,
} from './core';
import {stringify} from 'qs';

class ResultResponse implements CoreResponse {
  private readonly response: Response;
  private readonly cachedBody: undefined | any;

  public readonly statusCode: number;
  public readonly headers: Headers;
  public readonly cookies: ResponseSetCookies;

  constructor(response: Response) {
    this.response = response;
    this.statusCode = response.status;
    this.headers = this.createPlainHeaders(response);
    this.cookies = this.createPlainCookies(response);
  }

  private createPlainHeaders(response: Response): Headers {
    return {}; // todo: implement
  }

  private createPlainCookies(response: Response): ResponseSetCookies {
    return {}; // todo: implement
  }

  revealBody(): Promise<any> {
    // todo: implement
    return new Promise(resolve => {
      resolve('foo');
    });
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
  }

  public execute(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    const abortControllerByPendingRequestIds =
      this.abortControllerByPendingRequestIds;
    return new Promise((resolve, reject) => {
      const queryStrUrlPart =
        request.queryParams && Object.keys(request.queryParams).length
          ? `?${stringify(request.queryParams)}`
          : null;
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
          if (abortController.signal.aborted) {
            resolve({
              request: request,
              response: error.response
                ? new ResultResponse(error.response)
                : null,
              hasRequestBeenCancelled: true,
            });
            return;
          }
          resolve({
            request: request,
            response: error.response
              ? new ResultResponse(error.response)
              : null,
            hasRequestBeenCancelled: false,
            error,
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
    if (request.headers) {
      requestInit.headers = this.createRequestInitHeaders(requestInit, request);
    }
    if (request.body) {
      requestInit.body = request.body;
    }
    if (!config?.refineFetchApiRequestInit) {
      return requestInit;
    }
    return config.refineFetchApiRequestInit(requestInit);
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
