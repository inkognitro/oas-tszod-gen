import {MockServerEndpointSchema} from './httpMockServer';

export const jsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  expectedRequestContentType: 'application/json',
  expectedRequestBody: {
    type: 'json',
    content: {foo: 'bar'},
  },
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};
