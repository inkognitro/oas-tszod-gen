import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2/core';
import {Pet} from '@example-outputs/petstore2';

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

export type FindPetsByStatusRequest = RequestUnion<
  any,
  any,
  {
    status?: 'available' | 'pending' | 'sold';
  }
>;

export type FindPetsByStatusResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet[]>
      | ResponseBodyData<'application/json', Pet[]>
    >
  | Response<400>;

export type FindPetsByStatusRequestResult = RequestResult<
  FindPetsByStatusRequest,
  FindPetsByStatusResponse
>;

export function findPetsByStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<FindPetsByStatusRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<FindPetsByStatusRequestResult> {
  return requestHandler.execute(
    createRequest(findPetsByStatusEndpointSchema, payload),
    config
  );
}
