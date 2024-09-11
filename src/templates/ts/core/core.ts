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
  [headerName: string]: string;
};

export type RequestCookies = {
  [cookieName: string]: string;
};

export type ResponseSetCookies = {
  [cookieName: string]: string;
};

export type EndpointId = {
  method: string;
  path: string;
};

export type QueryParams = {
  [propertyName: string]:
    | QueryParams
    | string
    | string[]
    | number
    | number[]
    | boolean;
};

export type RequestCreationSettings = {
  endpointId: EndpointId;
  supportedSecuritySchemes?: SecurityScheme[];
  headers?: Headers;
  cookies?: RequestCookies;
  pathParams?: PathParams;
  queryParams?: QueryParams;
  body?: RequestBody;
  headersZodSchema?: ZodSchema; // only available with "withZod: true"
  cookiesZodSchema?: ZodSchema; // only available with "withZod: true"
  pathParamsZodSchema?: ZodSchema; // only available with "withZod: true"
  queryParamsZodSchema?: ZodSchema; // only available with "withZod: true"
  bodyZodSchema?: ZodSchema; // only available with "withZod: true"
  // convertResponseBodyFromFormData?: (responseBody: FormData) => object; // todo: implement formData to responseBody conversion, according to types
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
    headersZodSchema: settings.headersZodSchema, // only available with "withZod: true"
    cookiesZodSchema: settings.cookiesZodSchema, // only available with "withZod: true"
    pathParamsZodSchema: settings.pathParamsZodSchema, // only available with "withZod: true"
    queryParamsZodSchema: settings.queryParamsZodSchema, // only available with "withZod: true"
    bodyZodSchema: settings.bodyZodSchema, // only available with "withZod: true"
  };
}

export type RequestBody = Blob | FormData | JsonValue | string;

export type Request<
  P extends PathParams | undefined = any,
  Q extends QueryParams | undefined = any,
  B extends RequestBody | undefined = any,
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
  headersZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  cookiesZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  pathParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  queryParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  bodyZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
};

export type JsonValue =
  | null
  | string
  | number
  | boolean
  | {[propName: string]: JsonValue}
  | JsonValue[];

export type ResponseBody = Blob | FormData | JsonValue | string; // ArrayBuffer is ignored because it can be created from Blob

export interface Response<
  S extends StatusCode = any,
  B extends ResponseBody = any,
  H extends Headers = {},
  C extends ResponseSetCookies = {},
> {
  statusCode: S;
  headers: H;
  cookies: C;
  revealBody: () => Promise<B>;
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
