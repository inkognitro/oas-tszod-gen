import {isSchema, Schema} from './schema';
import {ComponentRef, isResponseComponentRef} from './componentRef';

export type ResponseBodyContent = {
  schema: Schema;
};

function isResponseBodyContent(
  anyValue: unknown
): anyValue is ResponseBodyContent {
  const value = anyValue as ResponseBodyContent;
  if (typeof value !== 'object') {
    return false;
  }
  return isSchema(value.schema);
}

export type ResponseBodyContentByContentTypeMap = {
  [contentType: 'application/json' | string]: ResponseBodyContent;
};

export type ResponseHeader = {
  schema: Schema;
};

function isResponseHeader(anyValue: unknown): anyValue is ResponseHeader {
  const value = anyValue as ResponseHeader;
  if (typeof value !== 'object') {
    return false;
  }
  return isSchema(value.schema);
}

export type ResponseHeaderByNameMap = {
  [name: string]: ResponseHeader;
};

export type ConcreteResponse = {
  description?: string;
  content?: ResponseBodyContentByContentTypeMap;
  headers?: ResponseHeaderByNameMap;
};

export function isConcreteResponse(
  anyValue: unknown
): anyValue is ConcreteResponse {
  const value = anyValue as ConcreteResponse;
  if (typeof value !== 'object') {
    return false;
  }
  if (!!value.description && typeof value.description !== 'string') {
    return false;
  }
  if (value.headers) {
    for (const headerName in value.headers) {
      const responseHeader = value.headers[headerName];
      if (!isResponseHeader(responseHeader)) {
        return false;
      }
    }
  }
  if (value.content) {
    for (const contentType in value.content) {
      const responseBodyContent = value.content[contentType];
      if (!isResponseBodyContent(responseBodyContent)) {
        return false;
      }
    }
  }
  return true;
}

export type Response = ConcreteResponse | ComponentRef;

export function isResponse(anyValue: unknown): anyValue is Response {
  return isConcreteResponse(anyValue) || isResponseComponentRef(anyValue);
}

export type ResponseByStatusCodeMap = {
  [statusCode: string]: Response;
};

export function isResponseByStatusCodeMap(
  anyValue: unknown
): anyValue is ResponseByStatusCodeMap {
  if (typeof anyValue !== 'object' || Array.isArray(anyValue)) {
    return false;
  }
  const value = anyValue as ResponseByStatusCodeMap;
  for (const statusCode in value) {
    if (isNaN(parseInt(statusCode)) && statusCode !== 'default') {
      return false;
    }
    const responseOrRef = value[statusCode];
    if (!isResponse(responseOrRef)) {
      return false;
    }
  }
  return true;
}
