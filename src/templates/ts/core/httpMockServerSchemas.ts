import {MockServerEndpointSchema} from './httpMockServer';

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
formData.append('file', 'pseudoBLOB');

export const mockFormData = formData;

export const getFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/formData',
  method: 'get',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
};

export const postFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  responseStatus: 200,
  responseContentType: 'application/x-www-form-urlencoded',
  responseBody: mockFormData,
  expectedRequestBody: {
    contentType: 'multipart/form-data',
    content: mockFormData,
  },
};
