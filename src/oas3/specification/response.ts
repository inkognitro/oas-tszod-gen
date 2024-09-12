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

export type Response = {
  description?: string;
  content?: ResponseBodyContentByContentTypeMap;
  headers?: ResponseHeaderByNameMap;
};

export function isResponse(anyValue: unknown): anyValue is Response {
  const value = anyValue as Response;
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

export type ResponseByStatusCodeMap = {
  [statusCode: string]: Response | ComponentRef;
};

export function isResponseByStatusCodeMap(
  anyValue: unknown
): anyValue is ResponseByStatusCodeMap {
  if (typeof anyValue !== 'object' || Array.isArray(anyValue)) {
    return false;
  }
  const value = anyValue as ResponseByStatusCodeMap;
  for (const statusCode in value) {
    const responseOrRef = value[statusCode];
    if (!isResponseComponentRef(responseOrRef) && !isResponse(responseOrRef)) {
      return false;
    }
  }
  return true;
}
