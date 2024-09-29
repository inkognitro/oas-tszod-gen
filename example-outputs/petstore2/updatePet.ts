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

export const updatePetEndpointSchema = {
  path: '/pet',
  method: 'put',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {
    'application/json': {},
    'application/xml': {},
    'application/x-www-form-urlencoded': {},
  },
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
    '405': {
      bodyByContentType: {},
    },
  },
};

export type UpdatePetRequestBody =
  | {
      contentType: 'application/json';
      body: Pet;
    }
  | {
      contentType: 'application/xml';
      body: Pet;
    }
  | {
      contentType: 'application/x-www-form-urlencoded';
      body: Pet;
    };

export type UpdatePetPayload = UpdatePetRequestBody;

export type UpdatePetResponse =
  | Response<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | Response<400>
  | Response<404>
  | Response<405>;

export type UpdatePetRequestResult = RequestResult<Request, UpdatePetResponse>;

export function updatePet(
  requestHandler: SimpleRequestHandler,
  payload: UpdatePetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: updatePetEndpointSchema}),
    config
  );
}
