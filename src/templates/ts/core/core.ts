function getUrlVariableNames(endpointPath: string): string[] {
  const urlVariableNameRegex = /[^{}]+(?=})/g;
  const urlVariableNames = endpointPath.match(urlVariableNameRegex);
  return urlVariableNames ?? [];
}

type PathParams = {
  [paramName: string]: number | string;
};

function createRequestUrl(endpointPath: string, params: PathParams): string {
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

type Headers = {
  [key: 'Content-Type' | string]: string;
};

type Cookies = {
  [key: string]: string;
};

export type SecurityScheme = {
  name: string;
  requiredPermissions: string[];
};

export type Request<
  PathParams extends object | undefined = any,
  QueryParams extends object | undefined = any,
  Body extends object | undefined = any,
> = {
  endpointId: EndpointId;
  url: string;
  supportedSecuritySchemes: SecurityScheme[];
  headers?: Headers;
  cookies?: Cookies;
  pathParams: PathParams;
  queryParams: QueryParams;
  body: Body;
};

type RequestCreationSettings = {
  endpointId: EndpointId;
  supportedSecuritySchemes?: SecurityScheme[];
  headers?: Headers;
  cookies?: Cookies;
  pathParams?: PathParams;
  queryParams?: object;
  body?: object;
};

export function createRequest(settings: RequestCreationSettings): Request {
  return {
    endpointId: settings.endpointId,
    supportedSecuritySchemes: settings.supportedSecuritySchemes ?? [],
    url: createRequestUrl(settings.endpointId.path, settings.pathParams ?? {}),
    headers: settings.headers,
    cookies: settings.cookies,
    pathParams: settings.pathParams,
    queryParams: settings.queryParams,
    body: settings.body,
  };
}

type StatusCode = number | 'any'; // this is not "any" of TypeScript, it's a string placeholder for unspecified status codes

export interface Response<
  S extends StatusCode = any,
  Body = any,
  H extends Headers = {},
  C extends Cookies = {},
> {
  statusCode: S;
  headers: H;
  cookies: C;
  body: Body;
}

export interface RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> {
  request: Req;
  response: null | Res;
  hasRequestBeenCancelled: boolean;
}

export interface RequestExecutionConfig {
  onUploadProgress?: (progress: number) => void;
}

export interface RequestHandler {
  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult>;
}
