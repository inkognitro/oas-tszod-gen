import {ZodSchema} from 'zod';

export type PlainObject =
  | null
  | (null | boolean | number | string | PlainObject)[]
  | {[key: string]: undefined | string | number | boolean | PlainObject};

export function isPlainObject(
  value: any,
  isSubValue = false
): value is PlainObject {
  if (!isSubValue) {
    if (value === null) {
      return true;
    }
    if (typeof value !== 'object') {
      return false;
    }
    for (const key in value) {
      if (!isPlainObject(value[key], true)) {
        return false;
      }
    }
    return true;
  }
  if (['string', 'boolean', 'number', 'undefined'].includes(typeof value)) {
    return true;
  }
  if (typeof value !== 'object') {
    return false;
  }
  const isArray = Array.isArray(value);
  for (const key in value) {
    if (isArray && typeof key === 'number' && value[key] === undefined) {
      return false;
    }
    if (!isPlainObject(value[key], true)) {
      return false;
    }
  }
  return true;
}

export type FormDataObject = {
  [key: string]: undefined | string | number | boolean | Blob;
};

export function findMatchingSchemaContentType(
  actualStatus: number,
  actualContentType: string,
  endpointSchema: EndpointSchema
): string | null {
  const responseSchema =
    endpointSchema.responseByStatus[actualStatus] ??
    endpointSchema.responseByStatus['default'];
  if (!responseSchema) {
    return null;
  }
  const actualLowercaseContentType = actualContentType.toLowerCase();
  const schemaContentTypes = Object.keys(responseSchema.bodyByContentType);
  return schemaContentTypes.reduce<null | string>((currentCt, schemaCt) => {
    const lowercaseSchemaCt = schemaCt.toLowerCase();
    if (
      !lowercaseSchemaCt.includes(actualLowercaseContentType) &&
      !actualLowercaseContentType.includes(lowercaseSchemaCt)
    ) {
      return currentCt;
    }
    if (!currentCt) {
      return schemaCt;
    }
    if (currentCt.length < schemaCt.length) {
      return schemaCt;
    }
    return currentCt;
  }, null);
}

export type EndpointSecuritySchema = {
  name: string;
  scopes: string[];
};

export type ResponseSchema = {
  bodyByContentType: Record<
    string,
    {
      zodSchema: ZodSchema;
    }
  >;
  headersZodSchema?: ZodSchema;
};

export type EndpointSchema = {
  path: string;
  method: string;
  supportedSecuritySchemas: EndpointSecuritySchema[];
  bodyByContentType: Record<
    string,
    {
      zodSchema: ZodSchema;
    }
  >;
  headersZodSchema?: ZodSchema;
  cookiesZodSchema?: ZodSchema;
  pathParamsZodSchema?: ZodSchema;
  queryParamsZodSchema?: ZodSchema;
  responseByStatus: Partial<Record<number | 'default', ResponseSchema>>;
};

export type PathParams = {
  [paramName: string]: number | string;
};

export type QueryParams = {
  [paramName: string]:
    | undefined
    | null
    | QueryParams
    | QueryParams[]
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[];
};

export type RequestHeaders = {
  [headerName: string]: string | number;
};

export type RequestCookies = {
  [cookieName: string]: string | number;
};

export type RequestBody =
  | Blob
  | FormData
  | FormDataObject
  | PlainObject
  | string;

export type RequestBodyData<
  TContentType extends string = any,
  TBody extends RequestBody = any,
> = {contentType: TContentType; body: TBody};

export type Request<
  Ct extends string | undefined = any,
  TBody extends RequestBody | undefined = any,
  TPathParams extends PathParams | undefined = any,
  TQueryParams extends QueryParams | undefined = any,
  THeaders extends RequestHeaders | undefined = any,
  TCookies extends RequestCookies | undefined = any,
> = {
  endpointSchema: EndpointSchema;
  id: string;
  url: string;
  headers: THeaders;
  cookies: TCookies;
  pathParams: TPathParams;
  queryParams: TQueryParams;
  // According to given OAS3 specs; used as default for the "content-type" request header
  contentType: Ct;
  body: TBody;
};

export type RequestUnion<
  TBodyData extends RequestBodyData,
  TPathParams extends PathParams | undefined = any,
  TQueryParams extends QueryParams | undefined = any,
  THeaders extends RequestHeaders | undefined = any,
  TCookies extends RequestCookies | undefined = any,
> = TBodyData extends any
  ? Request<
      TBodyData['contentType'],
      TBodyData['body'],
      TPathParams,
      TQueryParams,
      THeaders,
      TCookies
    >
  : never;

export type RequiredAndPartial<
  T extends object = any,
  RFields extends keyof T = any,
  OFields extends keyof T = any,
> = Required<Pick<T, RFields>> & Partial<Pick<T, OFields>>;

export type RequestPayload<
  TRequest extends Request = any,
  RFields extends 'pathParams' | 'queryParams' | 'contentType' | 'body' = any,
  OFields extends 'cookies' | 'headers' | 'queryParams' = any,
> = RequiredAndPartial<
  {
    requestId: string;
    headers: TRequest['headers'];
    cookies: TRequest['cookies'];
    pathParams: TRequest['pathParams'];
    queryParams: TRequest['queryParams'];
    contentType: TRequest['contentType'];
    body: TRequest['body'];
  },
  RFields,
  'requestId' | OFields
>;

export type RequestFromPayload<TPayload extends RequestPayload> = Request<
  TPayload['pathParams'],
  TPayload['queryParams'],
  TPayload['headers'],
  TPayload['cookies'],
  TPayload['contentType'],
  TPayload['body']
>;

export function createRequestId(): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
  let requestId = '';
  for (let i = 32; i > 0; i--) {
    requestId += chars[Math.floor(Math.random() * chars.length)];
  }
  return requestId;
}

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

export function createRequest<TPayload extends RequestPayload>(
  endpointSchema: EndpointSchema,
  payload?: RequestPayload
): RequestFromPayload<TPayload> {
  const p = payload ?? {};
  return {
    ...payload,
    id: p.requestId ?? createRequestId(),
    url: createRequestUrl(endpointSchema.path, p.pathParams ?? {}),
    contentType: p.contentType,
    body: p.body,
    pathParams: p.pathParams,
    queryParams: p.queryParams,
    headers: p.headers,
    cookies: p.cookies,
    endpointSchema: endpointSchema,
  };
}

export type ResponseHeaders = {
  [headerName: string]: string;
};

export type ResponseSetCookies = {
  [cookieName: string]: string; // string format: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
};

export type ResponseBody =
  | Blob
  | FormData
  | FormDataObject
  | PlainObject
  | string;

export type ResponseBodyData<
  ContentType extends string = any,
  B extends ResponseBody = any,
> = {
  contentType: ContentType;
  body: B;
};

export interface Response<
  S extends number = any,
  Ct extends string | null = any,
  B extends ResponseBody = any,
  H extends ResponseHeaders = any,
  C extends ResponseSetCookies = any,
> {
  status: S;
  headers: H;
  cookies: C;
  // NULL if the real "content-type" response header does not match with one defined in the OAS3 specs
  contentType: Ct;
  revealBody: () => Promise<B>;
  revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;
}

export type ResponseUnion<
  S extends number = any,
  BodyData extends ResponseBodyData = any,
  H extends ResponseHeaders = any,
  C extends ResponseSetCookies = any,
> = BodyData extends any
  ? Response<S, BodyData['contentType'], BodyData['body'], H, C>
  : never;

export interface RequestResult<
  Req extends Request = any,
  Res extends Response = any,
> {
  request: Req;
  response: null | Res;
  hasRequestBeenCancelled: boolean;
  error?: Error;
}

export interface RequestHandlerExecutionConfig {}

export interface SimpleRequestHandler {
  execute(
    request: Request,
    config?: RequestHandlerExecutionConfig
  ): Promise<RequestResult>;
}

export interface RequestHandler extends SimpleRequestHandler {
  cancelRequestById(requestId: string): void;
  cancelAllRequests(): void;
}
