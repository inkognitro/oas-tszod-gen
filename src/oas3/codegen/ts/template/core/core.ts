function getUrlVariableNames(endpointPath: string): string[] {
  const urlVariableNameRegex = /[^{}]+(?=})/g;
  const urlVariableNames = endpointPath.match(urlVariableNameRegex);
  return urlVariableNames ?? [];
}

type UrlParameters = {
  [paramName: string]: number | string;
};

function createRequestUrl(endpointPath: string, params: UrlParameters): string {
  const urlVariableNames = getUrlVariableNames(endpointPath);
  let url = endpointPath;
  urlVariableNames.forEach(urlVariableName => {
    const paramPropNames = Object.keys(params);
    if (!paramPropNames.includes(urlVariableName)) {
      console.error(
        `url variable "${urlVariableName}" not available in params: ${params}`
      );
      return;
    }
    // @ts-ignore
    const paramValue = params[urlVariableName];
    if (typeof paramValue !== 'string' && typeof paramValue !== 'number') {
      console.error(
        `url variable "${urlVariableName}" must either be a string or a number, following params were given: ${params}`
      );
      return;
    }
    url = url.replaceAll(`{${urlVariableName}}`, `${paramValue}`);
  });
  return url;
}

export type EndpointId = {
  method: string;
  path: string;
};

export type Request = {
  endpointId: EndpointId;
  url: string;
  supportedSecuritySchemes: string[];
  headers: object;
  queryParams: object;
  body: object;
};

type RequestCreationSettings = {
  endpointId: EndpointId;
  urlParams?: UrlParameters;
  queryParams?: object;
  body?: object;
};

export function createRequest(settings: RequestCreationSettings): Request {
  return {
    endpointId: settings.endpointId,
    url: createRequestUrl(settings.endpointId.path, settings.urlParams ?? {}),
    supportedSecuritySchemes: [],
    headers: {},
    queryParams: {},
    body: {},
  };
}

export enum StatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export type Response<S extends StatusCode = any, Body extends object = {}> = {
  statusCode: S;
  body: Body;
};

export type RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> = {
  request: Req;
  response: null | Res;
  hasRequestBeenCancelled: boolean;
};

export type RequestExecutionConfig = {
  onUploadProgress?: () => void;
};

export interface RequestHandler {
  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult>;
}
