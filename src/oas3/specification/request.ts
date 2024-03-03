import {Schema} from './schema';

export type RequestParameter = {
  name: string;
  in: 'query' | 'path';
  required: boolean;
  schema: Schema;
};

export function isRequestParameter(
  anyValue: any
): anyValue is RequestParameter {
  return false; // todo: implement
}

type RequestBody = {
  schema: Schema;
};

function isRequestBody(anyValue: any): anyValue is RequestBody {
  return false; // todo: implement
}

export type RequestBodyByContentTypes = {
  content: {
    [contentType: 'application/json' | string]: RequestBody;
  };
};

export function isRequestBodyByContentTypes(
  anyValue: any
): anyValue is RequestBodyByContentTypes {
  return false; // todo: implement
}
