import {Cookies, Request, RequestHandler, RequestResult} from './core';
import {stringify} from 'qs';

type CreateWithCookiesEnrichedRequestInitFunc = (
  currentRequestInit: RequestInit,
  cookies: Cookies
) => RequestInit;

type FetchApiRequestHandlerConfig = {
  generalRequestInit: RequestInit;
  createWithCookiesEnrichedRequestInit: CreateWithCookiesEnrichedRequestInitFunc;
};

export const defaultFetchApiRequestHandlerRequestInit: RequestInit = {
  credentials: 'same-origin',
};

const defaultConfig: FetchApiRequestHandlerConfig = {
  generalRequestInit: defaultFetchApiRequestHandlerRequestInit,
  createWithCookiesEnrichedRequestInit: currentRequestInit => {
    const warningParts = [
      'The default configuration of the FetchApiRequestHandler class does not implement cookie value enrichment',
      "for the RequestInit-parameter of the Javascript's built-in Fetch API.",
      'Please specify your own "createWithCookiesEnrichedRequestInit" function in your custom configuration',
      'when calling the FetchApiRequestHandler\'s constructor with "new FetchApiRequestHandler(customConfig)".',
      'Please be aware that servers and clients should define different headers in your',
      '"createWithCookiesEnrichedRequestInit" function: "Set-Cookie" (server) Vs "Cookie" (client).',
    ];
    console.warn(warningParts.join(' '));
    return currentRequestInit;
  },
};

type AbortControllerByRequestId = {
  [requestId: string]: AbortController;
};

export type FetchApiRequestHandlerExecuteConfig = {
  fetchApiRequestInit?: RequestInit;
  ignoreGeneralFetchApiRequestInit?: boolean;
};

export class FetchApiRequestHandler implements RequestHandler {
  private readonly config: FetchApiRequestHandlerConfig;
  private readonly abortControllerByPendingRequestIds: AbortControllerByRequestId;

  constructor(config: FetchApiRequestHandlerConfig = defaultConfig) {
    this.config = config;
    this.abortControllerByPendingRequestIds = {};
  }

  public execute(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    return new Promise(resolve => {
      const queryStrUrlPart = Object.keys(request.queryParams).length
        ? `?${stringify(request.queryParams)}`
        : null;
      const abortController = new AbortController();
      this.abortControllerByPendingRequestIds[request.id] = abortController;
      const requestInit: RequestInit = {
        ...this.createFetchApiRequestInit(request, config),
        signal: abortController.signal,
      };
      fetch(`${request.url}${queryStrUrlPart}`, requestInit)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          // const json = await response.json().then(); // todo: resolve and decide whether response should have GetBody() method instead
          // console.log(json);
        })
        .catch(error => {
          console.error(error.message);
        });
    });
  }

  cancelRequestById(requestId: string) {
    const controller = this.abortControllerByPendingRequestIds[requestId];
    if (!controller) {
      return;
    }
    controller.abort();
    delete this.abortControllerByPendingRequestIds[requestId];
  }

  cancelAllRequests() {
    for (const requestId in this.abortControllerByPendingRequestIds) {
      const controller = this.abortControllerByPendingRequestIds[requestId];
      if (!controller) {
        return;
      }
      controller.abort();
      delete this.abortControllerByPendingRequestIds[requestId];
    }
  }

  private createFetchApiRequestInit(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): RequestInit {
    let requestInit: RequestInit = {
      ...(config?.ignoreGeneralFetchApiRequestInit
        ? {}
        : this.config.generalRequestInit),
      method: request.endpointId.method,
    };
    if (request.headers) {
      requestInit.headers = request.headers;
    }
    if (request.body) {
      requestInit.body = request.body;
    }
    if (request.cookies) {
      requestInit = this.config.createWithCookiesEnrichedRequestInit(
        requestInit,
        request.cookies
      );
    }
    return {
      ...requestInit,
      ...(config?.fetchApiRequestInit ?? {}),
    };
  }
}
