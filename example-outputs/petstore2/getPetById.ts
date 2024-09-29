import {Pet} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const getPetByIdEndpointSchema = {
  path: '/pet/{petId}',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'api_key', scopes: []},
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
    '404': {
      bodyByContentType: {},
    },
  },
};

export type GetPetByIdPayload = {
  pathParams: {
    petId: number; // int
  };
};

export type GetPetByIdResponse =
  | Response<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | Response<400>
  | Response<404>;

export type GetPetByIdRequestResult = RequestResult<
  Request,
  GetPetByIdResponse
>;

export function getPetById(
  requestHandler: SimpleRequestHandler,
  payload: GetPetByIdPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetPetByIdRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getPetByIdEndpointSchema}),
    config
  );
}
