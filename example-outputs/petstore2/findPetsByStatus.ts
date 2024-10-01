import {Pet} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const findPetsByStatusEndpointSchema = {
  path: '/pet/findByStatus',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {},
    },
  },
};

export type FindPetsByStatusPayload = {
  queryParams: {
    status?: 'available' | 'pending' | 'sold';
  };
};

export type FindPetsByStatusResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet[]>
      | ResponseBodyData<'application/json', Pet[]>
    >
  | ResponseUnion<400>;

export type FindPetsByStatusRequestResult = RequestResult<
  Request,
  FindPetsByStatusResponse
>;

export function findPetsByStatus(
  requestHandler: SimpleRequestHandler,
  payload: FindPetsByStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<FindPetsByStatusRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: findPetsByStatusEndpointSchema}),
    config
  );
}
