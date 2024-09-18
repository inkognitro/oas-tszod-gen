import {MockServerEndpointSchema} from './httpMockServer';

export const jsonEndpointSchema: MockServerEndpointSchema = {
  path: '/json',
  method: 'get',
  responseContentType: 'application/json',
  responseBody: {foo: 'bar'},
};
