import {MockServerEndpointSchema} from './httpMockServer';

export const getPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
};

export const postPlainTextEndpointSchema: MockServerEndpointSchema = {
  path: '/plain-text',
  method: 'post',
  responseStatus: 200,
  responseContentType: 'text/plain',
  responseBody: 'pong',
  expectedRequestBody: {
    contentType: 'text/plain',
    content: 'ping',
  },
};

export const getJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

export const postJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  responseStatus: 200,
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
  expectedRequestBody: {
    contentType: 'application/json',
    content: {foo: 'bar'},
  },
};

const formData = new FormData();
formData.append('foo', 'bar');

export const mockFormData = formData;

export const getFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
};

export const postFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/form-data',
  method: 'post',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
  expectedRequestBody: {
    contentType: 'multipart/form-data',
    content: {foo: 'bar'},
  },
};
