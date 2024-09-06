import {Request, RequestHandler, RequestResult} from './core';

function createSerializedQueryStringUrlPart(
  queryParams: object
): null | string {
  const queryStrParts: string[] = [];
  for (const key in queryParams) {
    // eslint-disable-next-line no-prototype-builtins
    if (!queryParams.hasOwnProperty(key)) {
      continue;
    }
    // @ts-ignore
    const value = queryParams[key] as string;
    queryStrParts.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(value)
    );
  }
  if (queryStrParts.length === 0) {
    return null;
  }
  return `?${queryStrParts.join('&')}`;
}

const defaultRequestInit: RequestInit = {
  credentials: 'same-origin',
};

export type FetchApiRequestHandlerExecuteConfig = {
  fetchApiRequestInit?: RequestInit;
  ignoreGeneralFetchApiRequestInit?: boolean;
};

export class FetchApiRequestHandler implements RequestHandler {
  private readonly generalRequestInit: RequestInit;

  constructor(generalRequestInit: RequestInit = defaultRequestInit) {
    this.generalRequestInit = generalRequestInit;
  }

  public execute(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): Promise<RequestResult> {
    return new Promise(resolve => {
      const queryStrUrlPart = request.queryParams
        ? createSerializedQueryStringUrlPart(request.queryParams)
        : null;
      fetch(
        `${request.url}${queryStrUrlPart}`,
        this.createFetchApiRequestInit(request, config)
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
          }
          const json = await response.json().then(); // todo: resolve and decide whether response should have GetBody() method instead
          console.log(json);
        })
        .catch(error => {
          console.error(error.message);
        });
    });
  }

  public cancelAllRequests() {
    throw new Error('implement me!');
  }

  public cancelRequestById(requestId: string) {
    throw new Error('implement me!');
  }

  private createFetchApiRequestInit(
    request: Request,
    config?: FetchApiRequestHandlerExecuteConfig
  ): RequestInit {
    const requestInit: RequestInit = {
      ...(config?.ignoreGeneralFetchApiRequestInit
        ? {}
        : this.generalRequestInit),
      method: request.endpointId.method,
    };
    if (request.headers) {
      requestInit.headers = request.headers;
    }
    // todo: implement other request parts
    return {
      ...requestInit,
      ...(config?.fetchApiRequestInit ?? {}),
    };
  }
}
