import {z_Pet, Pet} from '@example-outputs/petstore2-with-zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const updatePetEndpointSchema = {
  path: '/pet',
  method: 'put',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {
    'application/json': {
      zodSchema: z_Pet,
    },
    'application/xml': {
      zodSchema: z_Pet,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: z_Pet,
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {
          zodSchema: z_Pet,
        },
        'application/json': {
          zodSchema: z_Pet,
        },
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

export type UpdatePetRequest = RequestUnion<
  | RequestBodyData<'application/json', Pet>
  | RequestBodyData<'application/xml', Pet>
  | RequestBodyData<'application/x-www-form-urlencoded', Pet>
>;

export type UpdatePetResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | Response<400>
  | Response<404>
  | Response<405>;

export type UpdatePetRequestResult = RequestResult<
  UpdatePetRequest,
  UpdatePetResponse
>;

export function updatePet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<UpdatePetRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetRequestResult> {
  return requestHandler.execute(
    createRequest(updatePetEndpointSchema, payload),
    config
  );
}
