import {isResponseByStatusCodes, Response} from './response';
import {
  isRequestBodyByContentTypes,
  isRequestParameter,
  RequestBodyByContentTypes,
  RequestParameter,
} from './request';

export type Endpoint = {
  operationId: string;
  tags: string[];
  parameters: RequestParameter[];
  requestBody: RequestBodyByContentTypes;
  summary?: string;
  responses: {
    [statusCode: string]: Response;
  };
};

export function isEndpoint(anyValue: any): anyValue is Endpoint {
  const value = anyValue as Endpoint;
  if (typeof value !== 'object' || !Array.isArray(value)) {
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
  if (!Array.isArray(value.parameters)) {
    return false;
  }
  const invalidParameter = value.parameters.find(p => !isRequestParameter(p));
  if (invalidParameter) {
    return false;
  }
  if (!Array.isArray(value.parameters)) {
    return false;
  }
  if (!isRequestBodyByContentTypes(value.requestBody)) {
    return false;
  }
  if (value.summary !== undefined && typeof value.summary !== 'string') {
    return false;
  }
  if (!isResponseByStatusCodes(value.responses)) {
    return false;
  }
  return true;
}
