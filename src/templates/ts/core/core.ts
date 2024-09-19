import {ZodSchema} from 'zod';

export type RequestHeaders = {
  [headerName: string]: string | number;
};

export type ResponseHeaders = {
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

// todo: implement support for ReadableStream, BufferSource, URLSearchParams
export type RequestBody = Blob | FormData | JsonValue | string;

export type JsonContentValue =
  | null
  | string
  | number
  | boolean
  | {[propName: string]: JsonContentValue}
  | JsonContentValue[];

export type JsonValue =
  | null
  | {[propName: string]: JsonContentValue}
  | JsonContentValue[];

export function isJsonValue(
  value: any,
  isSubValue = false
): value is JsonValue {
  if (value === null) {
    return true;
  }
  if (isSubValue && ['string', 'boolean', 'number'].includes(typeof value)) {
    return true;
  }
  if (typeof value !== 'object') {
    return false;
  }
  for (const key in value) {
    if (typeof key !== 'string' && typeof key !== 'number') {
      return false;
    }
    if (!isJsonValue(value[key], true)) {
      return false;
    }
  }
  return true;
}

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

export type RequestCreationSettings = {
  headers?: RequestHeaders;
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
  responseByStatus: Partial<Record<number | 'default', ResponseSchema>>;
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

export type Request = {
  id: string;
  url: string;
  headers?: RequestHeaders;
  cookies?: RequestCookies;
  pathParams?: PathParams;
  queryParams?: QueryParams;
  // according to oas3 specs; used as default for the "content-type" request header
  contentType: string | null;
  body?: RequestBody;
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
  // according to oas3 specs; NULL if the real "content-type" response header does not match with one defined in the specs (case in-sensitive check)
  contentType: ContentType | null;
  revealBody: () => Promise<B>;
};

export type ResponseData<
  B extends ResponseBodyData = any,
  H extends ResponseHeaders = any,
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
  error?: Error;
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
