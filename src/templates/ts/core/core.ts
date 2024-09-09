import {ZodSchema} from 'zod';

export type PathParams = {
  [paramName: string]: number | string;
};

export type StatusCode = number | 'any'; // This is not "any" of TypeScript, it's a string placeholder for unspecified status codes

export type SecurityScheme = {
  name: string;
  requiredPermissions: string[];
};

export type Headers = {
  [key: 'Content-Type' | string]: string;
};

export type RequestCookies = {
  [key: string]: string;
};

export type ResponseSetCookies = {
  [key: string]: string;
};

export type EndpointId = {
  method: string;
  path: string;
};

export type RequestCreationSettings = {
  endpointId: EndpointId;
  supportedSecuritySchemes?: SecurityScheme[];
  headers?: Headers;
  cookies?: RequestCookies;
  pathParams?: PathParams;
  queryParams?: object;
  body?: object;
  headersZodSchema?: ZodSchema;
  cookiesZodSchema?: ZodSchema;
  pathParamsZodSchema?: ZodSchema;
  queryParamsZodSchema?: ZodSchema;
  bodyZodSchema?: ZodSchema;
};

export function createRequestUrl(
  endpointPath: string,
  params: PathParams
): string {
  const urlVariableNames = endpointPath.match(/[^{}]+(?=})/g) ?? [];
  let url = endpointPath;
  urlVariableNames.forEach(urlVariableName => {
    const paramPropNames = Object.keys(params);
    if (!paramPropNames.includes(urlVariableName)) {
      console.error(
        `url variable "${urlVariableName}" not available in params:`,
        params
      );
      return;
    }
    const paramValue = params[urlVariableName];
    if (typeof paramValue !== 'string' && typeof paramValue !== 'number') {
      console.error(
        `url variable "${urlVariableName}" must either be a string or a number, following params were given:`,
        params
      );
      return;
    }
    url = url.split(`{${urlVariableName}}`).join(`${paramValue}`);
  });
  return url;
}

export function createRequest(settings: RequestCreationSettings): Request {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let requestId = '';
  for (let i = 32; i > 0; i--) {
    requestId += chars[Math.floor(Math.random() * chars.length)];
  }
  return {
    id: requestId,
    endpointId: settings.endpointId,
    supportedSecuritySchemes: settings.supportedSecuritySchemes ?? [],
    url: createRequestUrl(settings.endpointId.path, settings.pathParams ?? {}),
    headers: settings.headers,
    cookies: settings.cookies,
    pathParams: settings.pathParams,
    queryParams: settings.queryParams,
    body: settings.body,
    headersZodSchema: settings.headersZodSchema,
    cookiesZodSchema: settings.cookiesZodSchema,
    pathParamsZodSchema: settings.pathParamsZodSchema,
    queryParamsZodSchema: settings.queryParamsZodSchema,
    bodyZodSchema: settings.bodyZodSchema,
  };
}

export type Request<
  P extends PathParams | undefined = any,
  Q extends object | undefined = any,
  B extends object | undefined = any,
> = {
  id: string;
  endpointId: EndpointId;
  url: string;
  supportedSecuritySchemes: SecurityScheme[];
  headers?: Headers;
  cookies?: RequestCookies;
  pathParams: P;
  queryParams: Q;
  body: B;
  headersZodSchema?: ZodSchema; // only defined when "withZod: true"
  cookiesZodSchema?: ZodSchema; // only defined when "withZod: true"
  pathParamsZodSchema?: ZodSchema; // only defined when "withZod: true"
  queryParamsZodSchema?: ZodSchema; // only defined when "withZod: true"
  bodyZodSchema?: ZodSchema; // only defined when "withZod: true"
};

export interface Response<
  S extends StatusCode = any,
  B = any,
  H extends Headers = {},
  C extends ResponseSetCookies = {},
> {
  statusCode: S;
  headers: H;
  cookies: C;
  body: B;
}

export interface RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> {
  request: Req;
  response: null | Res;
  hasRequestBeenCancelled: boolean;
  error?: Error; // must only be set when the Promise<RequestResult> was rejected
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RequestExecutionConfig {}

export interface RequestHandler {
  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult>;
  cancelRequestById(requestId: string): void;
  cancelAllRequests(): void;
}
