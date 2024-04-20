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
    url = url.split(`{${urlVariableName}}`).join(`${paramValue}`);
  });
  return url;
}

export type EndpointId = {
  method: string;
  path: string;
};

export type Request<
  QueryParams extends object = any,
  Body extends object = any,
> = {
  endpointId: EndpointId;
  url: string;
  supportedSecuritySchemes: string[];
  securityScheme: null | string;
  headers: object;
  queryParams: QueryParams;
  body: Body;
};

type RequestCreationSettings = {
  endpointId: EndpointId;
  supportedSecuritySchemes?: [];
  urlParams?: UrlParameters;
  headers?: {};
  queryParams?: object;
  body?: object;
};

export function createRequest(settings: RequestCreationSettings): Request {
  return {
    endpointId: settings.endpointId,
    supportedSecuritySchemes: settings.supportedSecuritySchemes ?? [],
    securityScheme: null,
    url: createRequestUrl(settings.endpointId.path, settings.urlParams ?? {}),
    headers: settings.headers ?? {},
    queryParams: settings.queryParams ?? {},
    body: settings.body ?? {},
  };
}

export enum StatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NonAuthoritativeInformation = 203,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  ContentTooLarge = 413,
  InternalServerError = 500,
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
