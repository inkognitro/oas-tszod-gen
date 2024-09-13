import {ZodSchema} from 'zod';

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

export type PathParams = {
  [paramName: string]: number | string;
};

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
  contentType: string | null;
  body?: RequestBody;
  schema: RequestSchema;
};

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
    contentType: settings.contentType,
    body: settings.body,
    schema: settings.schema,
  };
}

export type ResponseSchema = {
  status: number | 'any'; // "any" is used for unexpected status codes
  headersZodSchema?: ZodSchema; // only available with "withZod: true"
  bodyVariants: {
    contentType: string;
    zodSchema?: ZodSchema; // only available with "withZod: true"
  }[];
};

type RequestSchema = {
  headersZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  cookiesZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  pathParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  queryParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  bodyVariants: {
    contentType: string; // case-sensitive, according to oas3 specs
    zodSchema?: ZodSchema; // only available with "withZod: true"
  }[];
  responses: ResponseSchema[];
};

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
  contentType: string | null; // case-sensitive, according to oas3 specs, used for the "content-type" header by default
  body: B;
  schema: RequestSchema;
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
  S extends number = any,
  ContentType extends string = any,
  B extends ResponseBody = any,
  H extends Headers = {},
  C extends ResponseSetCookies = {},
> {
  status: S;
  contentType: ContentType | null; // case-sensitive, according to oas3 specs
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
export interface RequestHandlerExecutionConfig {}

export interface RequestHandler {
  execute(
    request: Request,
    config?: RequestHandlerExecutionConfig
  ): Promise<RequestResult>;
  cancelRequestById(requestId: string): void;
  cancelAllRequests(): void;
}
