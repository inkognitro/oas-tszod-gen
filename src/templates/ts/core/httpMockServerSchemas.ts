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
