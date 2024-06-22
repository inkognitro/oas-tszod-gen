import {isResponse, Response} from './response';
import {isSchema, Schema} from './schema';
import {isSecurityScheme, SecurityScheme} from './security';
import {isParameter, isRequest, Parameter, Request} from './request';

export type RequestByMethodMap = {
  [requestMethod: string]: Request;
};

function isRequestByMethodMap(
  anyValue: unknown
): anyValue is RequestByMethodMap {
  const value = anyValue as RequestByMethodMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const requestMethod in value) {
    const request = value[requestMethod];
    if (!isRequest(request)) {
      return false;
    }
  }
  return true;
}

export type RequestDefinitionsByPathMap = {
  [requestPath: string]: RequestByMethodMap;
};

function isRequestDefinitionsByPathMap(
  anyValue: unknown
): anyValue is RequestDefinitionsByPathMap {
  const value = anyValue as RequestDefinitionsByPathMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const requestPath in value) {
    const requestByMethodMap = value[requestPath];
    if (!isRequestByMethodMap(requestByMethodMap)) {
      return false;
    }
  }
  return true;
}

type ResponseByNameMap = {
  [requestPath: string]: Response;
};

function isResponseByNameMap(anyValue: unknown): anyValue is ResponseByNameMap {
  const value = anyValue as ResponseByNameMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const name in value) {
    const response = value[name];
    if (!isResponse(response)) {
      return false;
    }
  }
  return true;
}

type SchemaByNameMap = {
  [requestPath: string]: Schema;
};

function isSchemaByNameMap(anyValue: unknown): anyValue is SchemaByNameMap {
  const value = anyValue as SchemaByNameMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const name in value) {
    const schema = value[name];
    if (!isSchema(schema)) {
      return false;
    }
  }
  return true;
}

type SecuritySchemeByNameMap = {
  [requestPath: string]: SecurityScheme;
};

function isSecuritySchemeByNameMap(
  anyValue: unknown
): anyValue is SecuritySchemeByNameMap {
  const value = anyValue as SecuritySchemeByNameMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const name in value) {
    const securityScheme = value[name];
    if (!isSecurityScheme(securityScheme)) {
      return false;
    }
  }
  return true;
}

type RequestParameterByNameMap = {
  [name: string]: Parameter;
};

function isRequestParameterByNameMap(
  anyValue: unknown
): anyValue is RequestParameterByNameMap {
  const value = anyValue as RequestParameterByNameMap;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const name in value) {
    const parameter = value[name];
    if (!isParameter(parameter)) {
      return false;
    }
  }
  return true;
}

type ComponentDefinitions = {
  parameters?: RequestParameterByNameMap;
  responses?: ResponseByNameMap;
  schemas?: SchemaByNameMap;
  securitySchemes?: SecuritySchemeByNameMap;
};

function isComponentDefinitions(
  anyValue: unknown
): anyValue is ComponentDefinitions {
  const value = anyValue as ComponentDefinitions;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (value.parameters && !isRequestParameterByNameMap(value.parameters)) {
    return false;
  }
  if (value.responses && !isResponseByNameMap(value.responses)) {
    return false;
  }
  if (value.schemas && !isSchemaByNameMap(value.schemas)) {
    return false;
  }
  if (
    value.securitySchemes &&
    !isSecuritySchemeByNameMap(value.securitySchemes)
  ) {
    return false;
  }
  return true;
}

export type Specification = {
  openapi: string;
  paths: RequestDefinitionsByPathMap;
  components: ComponentDefinitions;
};

export function isSpecification(anyValue: unknown): anyValue is Specification {
  const value = anyValue as Specification;
  if (typeof value !== 'object') {
    return false;
  }
  if (typeof value.openapi !== 'string') {
    return false;
  }
  if (!isRequestDefinitionsByPathMap(value.paths)) {
    return false;
  }
  if (!isComponentDefinitions(value.components)) {
    return false;
  }
  return true;
}
