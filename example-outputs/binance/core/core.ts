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
  [paramName: string]:
    | QueryParams
    | QueryParams[]
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[];
};

export type RequestCookies = {
  [cookieName: string]: string;
};

export type RequestBody =
  | Blob
  | FormData
  | FormDataObject
  | PlainObject
  | string;

export type PlainObject =
  | null
  | (null | boolean | number | string | PlainObject)[]
  | {[key: string]: undefined | string | number | boolean | PlainObject};

export type FormDataObject = {
  [key: string]: undefined | string | number | boolean | Blob;
};

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
  scopes: string[];
};

export type EndpointSchema = {
  path: string;
  method: string;
  supportedSecuritySchemas: EndpointSecuritySchema[];
  bodyByContentType: Record<string, {}>;
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
  bodyByContentType: Record<string, {}>;
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
  // NULL if the real "content-type" response header does not match with one defined in the OAS3 specs
  contentType: ContentType | null;
  revealBody: () => Promise<B>;
  revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;
};

export type Response<
  S extends number = any,
  B extends ResponseBodyData = any,
  H extends ResponseHeaders = any,
  C extends ResponseSetCookies = any,
> = B & {
  status: S;
  headers: H;
  cookies: C;
  revealBodyAsArrayBuffer: () => Promise<ArrayBuffer>;
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
