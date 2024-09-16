import {ZodSchema} from 'zod';

export type Headers = {
  [headerName: string]: string;
};

export type PathParams = {
  [paramName: string]: number | string;
};

export type QueryParams = {
  [paramName: string]: QueryParams | QueryParams[] | string | number | boolean;
};

export type RequestCookies = {
  [cookieName: string]: string;
};

export type RequestBody = Blob | FormData | JsonValue | string;

export type JsonValue =
  | null
  | string
  | number
  | boolean
  | {[propName: string]: JsonValue}
  | JsonValue[];

export type RequestCreationSettings = {
  headers?: Headers;
  cookies?: RequestCookies;
  pathParams?: PathParams;
  queryParams?: QueryParams;
  contentType?: string;
  body?: RequestBody;
  endpointSchema: EndpointSchema;
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

export type EndpointSecuritySchema = {
  name: string;
  requiredPermissions: string[];
};

export type EndpointSchema = {
  path: string;
  method: string;
  supportedSecuritySchemas: EndpointSecuritySchema[];
  bodyByContentType: Record<
    string,
    {
      zodSchema: ZodSchema; // only defined by the generator when "withZod: true"
    }
  >;
  headersZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  cookiesZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  pathParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  queryParamsZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
  responseByStatus: Partial<Record<number | 'any', ResponseSchema>>;
};

export function createRequest(settings: RequestCreationSettings): Request {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let requestId = '';
  for (let i = 32; i > 0; i--) {
    requestId += chars[Math.floor(Math.random() * chars.length)];
  }
  return {
    ...settings,
    id: requestId,
    url: createRequestUrl(
      settings.endpointSchema.path,
      settings.pathParams ?? {}
    ),
    contentType: settings.contentType ?? null,
  };
}

export type Request<
  P extends PathParams | undefined = any,
  Q extends QueryParams | undefined = any,
  B extends RequestBody | undefined = any,
> = {
  id: string;
  url: string;
  headers?: Headers;
  cookies?: RequestCookies;
  pathParams?: P;
  queryParams?: Q;
  contentType: string | null; // case-sensitive, according to oas3 specs; used as default "content-type" request header
  body?: B;
  endpointSchema: EndpointSchema;
};

export type ResponseSchema = {
  bodyByContentType: Record<
    string,
    {
      zodSchema: ZodSchema; // only defined by the generator when "withZod: true"
    }
  >;
  headersZodSchema?: ZodSchema; // only defined by the generator when "withZod: true"
};

export type ResponseSetCookies = {
  [cookieName: string]: string; // string format: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
};

export type ResponseBody = Blob | FormData | JsonValue | string;

export type ResponseBodyData<
  ContentType extends string = any,
  B extends ResponseBody = any,
> = {
  contentType: ContentType | null; // case-sensitive, according to oas3 specs; NULL if the real "content-type" response header is not defined in specs (case-insensitive check)
  revealBody: () => Promise<B>;
};

export type ResponseData<
  B extends ResponseBodyData = any,
  H extends Headers = any,
  C extends ResponseSetCookies = any,
> = B & {
  headers: H;
  cookies: C;
};

export type Response<
  S extends number = any,
  D extends ResponseData = any,
> = D & {
  status: S;
};

export interface RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> {
  request: Req;
  response: null | Res;
  hasRequestBeenCancelled: boolean;
  error?: Error; // must only be set when the RequestResult Promise was rejected
}

export interface RequestHandlerExecutionConfig {}

export interface RequestHandler {
  execute(
    request: Request,
    config?: RequestHandlerExecutionConfig
  ): Promise<RequestResult>;
  cancelRequestById(requestId: string): void;
  cancelAllRequests(): void;
}
