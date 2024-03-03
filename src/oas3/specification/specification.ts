import {Endpoint, isEndpoint} from './endpoint';

export type EndpointsByPath = {
  [requestMethod: string]: Endpoint;
};

function isEndpointsByPath(anyValue: any): anyValue is EndpointsByPath {
  const value = anyValue as EndpointsByPath;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  for (const requestMethod in value) {
    const endpoint = value[requestMethod];
    if (!isEndpoint(endpoint)) {
      return false;
    }
  }
  return true;
}

export type Specification = {
  openapi: string;
  paths: EndpointsByPath;
  // todo: add security aspects (e.g. headers or so to send too)
};

function isValidSpecification(anyValue: any): anyValue is Specification {
  const value = anyValue as Specification;
  if (typeof value !== 'object') {
    return false;
  }
  if (typeof value.openapi !== 'string') {
    return false;
  }
  if (!isEndpointsByPath(value.paths)) {
    return false;
  }
  return true;
}
