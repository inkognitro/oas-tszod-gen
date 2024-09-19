import {MockServerEndpointSchema} from './httpMockServer';

export const getJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

export const postJsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  expectedRequestContentType: 'application/json',
  expectedRequestBody: {
    type: 'json',
    content: {foo: 'bar'},
  },
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};

const formData = new FormData();
formData.append('foo', 'bar');
formData.append('file', 'pseudoBLOB');

export const mockFormData = formData;

export const getFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/formData',
  method: 'get',
  responseContentType: 'multipart/form-data',
  responseBody: formData,
};

export const postFormDataEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'post',
  expectedRequestContentType: 'multipart/form-data',
  expectedRequestBody: {
    type: 'formData',
  },
  responseContentType: 'application/json',
  responseBody: {success: true},
};
