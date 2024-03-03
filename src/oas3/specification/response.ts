import {Schema} from './schema';

type ResponseBodyContent = {
  schema: Schema;
};

export type Response = {
  description?: string;
  content: {
    [contentType: 'application/json' | string]: ResponseBodyContent;
  };
};

export function isResponse(anyValue: any): anyValue is Response {
  return false; // todo: implement
}

export type ResponseRef = {
  $ref: string;
};

export function isResponseRef(anyValue: any): anyValue is ResponseRef {
  return false; // todo: implement
}

export type ResponseByStatusCodes = {
  content: {
    [contentType: 'application/json' | string]: Response | ResponseRef;
  };
};
export function isResponseByStatusCodes(
  anyValue: any
): anyValue is ResponseByStatusCodes {
  return false; // todo: implement
}
