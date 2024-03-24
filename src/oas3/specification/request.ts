import {isSchema, Schema} from './schema';
import {isResponseByStatusCodeMap, ResponseByStatusCodeMap} from './response';
import {ComponentRef, isParameterComponentRef} from './componentRef';

type PermissionsBySecurityName = {
  [securityName: string]: string[];
};

function isPermissionsBySecurityName(
  anyValue: any
): anyValue is PermissionsBySecurityName {
  const value = anyValue as PermissionsBySecurityName;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const securityNames = Object.values(value);
  for (const securityName in securityNames) {
    const permissions = securityNames[securityName];
    if (!Array.isArray(permissions)) {
      return false;
    }
    if (permissions.find(p => typeof p !== 'string')) {
      return false;
    }
  }
  return true;
}

export type PermissionsBySecurityNameArray = PermissionsBySecurityName[];

export function isPermissionsBySecurityNameArray(
  anyValue: any
): anyValue is PermissionsBySecurityNameArray {
  const value = anyValue as PermissionsBySecurityNameArray;
  if (value === null) {
    return true;
  }
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.find(v => !isPermissionsBySecurityName(v))) {
    return false;
  }
  return true;
}

export type RequestParameter = {
  name: string;
  in: 'query' | 'path';
  required?: boolean;
  schema: Schema;
};

export function isRequestParameter(
  anyValue: any
): anyValue is RequestParameter {
  const value = anyValue as RequestParameter;
  if (typeof value !== 'object') {
    return false;
  }
  if (typeof value.name !== 'string') {
    return false;
  }
  if (typeof value.in !== 'string' || !['query', 'path'].includes(value.in)) {
    return false;
  }
  if (value.required !== undefined && typeof value.required !== 'boolean') {
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
  content?: {
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
  if (value.content === undefined) {
    return true;
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

export type Request = {
  operationId: string;
  tags: string[];
  parameters?: (RequestParameter | ComponentRef)[];
  requestBody?: RequestBodyByContentTypes;
  summary?: string;
  responses: ResponseByStatusCodeMap;
  security?: null | PermissionsBySecurityNameArray;
};

export function isRequest(anyValue: any): anyValue is Request {
  const value = anyValue as Request;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (typeof value.operationId !== 'string') {
    return false;
  }
  if (!Array.isArray(value.tags)) {
    return false;
  }
  const invalidTag = value.tags.find(t => typeof t !== 'string');
  if (invalidTag) {
    return false;
  }
  if (value.parameters !== undefined && !Array.isArray(value.parameters)) {
    return false;
  }
  const invalidParameter = value.parameters?.find(
    p => !isRequestParameter(p) && !isParameterComponentRef(p)
  );
  if (invalidParameter) {
    return false;
  }
  if (value.parameters !== undefined && !Array.isArray(value.parameters)) {
    return false;
  }
  if (
    value.requestBody !== undefined &&
    !isRequestBodyByContentTypes(value.requestBody)
  ) {
    return false;
  }
  if (value.summary !== undefined && typeof value.summary !== 'string') {
    return false;
  }
  if (!isResponseByStatusCodeMap(value.responses)) {
    return false;
  }
  if (
    value.security !== undefined &&
    !isPermissionsBySecurityNameArray(value.security)
  ) {
    return false;
  }
  return true;
}
