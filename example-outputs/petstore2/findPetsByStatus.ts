import {Pet} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseData,
  Response,
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
    {name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']},
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
  | Response<
      200,
      ResponseData<
        | ResponseBodyData<'application/xml', Pet[]>
        | ResponseBodyData<'application/json', Pet[]>
      >
    >
  | Response<400, any>;

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
