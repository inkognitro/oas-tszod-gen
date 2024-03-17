import {isSchema, Schema} from './schema';
import {ComponentRef, isComponentRef} from '@oas3/specification/componentRef';

export type ResponseBodyContent = {
  schema: Schema;
};

function isResponseBodyContent(anyValue: any): anyValue is ResponseBodyContent {
  const value = anyValue as ResponseBodyContent;
  if (typeof value !== 'object') {
    return false;
  }
  if (!isSchema(value.schema)) {
    return false;
  }
  return true;
}

export type Response = {
  description?: string;
  content: {
    [contentType: 'application/json' | string]: ResponseBodyContent;
  };
};

export function isResponse(anyValue: any): anyValue is Response {
  const value = anyValue as Response;
  if (typeof value !== 'object') {
    return false;
  }
  if (!!value.description && typeof value.description !== 'string') {
    return false;
  }
  for (const contentType in value.content) {
    const responseBodyContent = value.content[contentType];
    if (!isResponseBodyContent(responseBodyContent)) {
      return false;
    }
  }
  return true;
}

export type ResponseByStatusCodeMap = {
  [statusCode: string]: Response | ComponentRef;
};

export function isResponseByStatusCodeMap(
  anyValue: any
): anyValue is ResponseByStatusCodeMap {
  if (typeof anyValue !== 'object' || Array.isArray(anyValue)) {
    return false;
  }
  const value = anyValue as ResponseByStatusCodeMap;
  for (const statusCode in value) {
    const responseOrRef = value[statusCode];
    if (!isComponentRef(responseOrRef) && !isResponse(responseOrRef)) {
      return false;
    }
  }
  return false;
}
