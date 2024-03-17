import {isSchema, Schema} from './schema';

export type RequestParameter = {
  name: string;
  in: 'query' | 'path';
  required: boolean;
  schema: Schema;
};

export function isRequestParameter(
  anyValue: any
): anyValue is RequestParameter {
  const value = anyValue as RequestParameter;
  if (typeof value !== 'object') {
    return false;
  }
  if (!!value.name && typeof value.name !== 'string') {
    return false;
  }
  if (typeof value.in !== 'string' || !['query', 'path'].includes(value.in)) {
    return false;
  }
  if (typeof value.required !== 'boolean') {
    return false;
  }
  if (!isSchema(value.schema)) {
    return false;
  }
  return true;
}

type RequestBody = {
  schema: Schema;
};

function isRequestBody(anyValue: any): anyValue is RequestBody {
  const value = anyValue as RequestBody;
  if (typeof value !== 'object') {
    return false;
  }
  if (!isSchema(value.schema)) {
    return false;
  }
  return true;
}

export type RequestBodyByContentTypes = {
  content: {
    [contentType: 'application/json' | string]: RequestBody;
  };
};

export function isRequestBodyByContentTypes(
  anyValue: any
): anyValue is RequestBodyByContentTypes {
  const value = anyValue as RequestBodyByContentTypes;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (typeof value.content !== 'object' || Array.isArray(value.content)) {
    return false;
  }
  for (const contentType in value.content) {
    const requestBody = value.content[contentType];
    if (!isRequestBody(requestBody)) {
      return false;
    }
  }
  return true;
}
