import {petZodSchema, Pet} from '@example-outputs/petstore2-with-zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
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
      zodSchema: petZodSchema,
    },
    'application/xml': {
      zodSchema: petZodSchema,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: petZodSchema,
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {
          zodSchema: petZodSchema,
        },
        'application/json': {
          zodSchema: petZodSchema,
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
  | ResponseUnion<400>
  | ResponseUnion<404>
  | ResponseUnion<405>;

export type UpdatePetRequestResult = RequestResult<
  UpdatePetRequest,
  UpdatePetResponse
>;

export function updatePet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<UpdatePetRequest, 'contentType' | 'body'>,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetRequestResult> {
  return requestHandler.execute(
    createRequest(updatePetEndpointSchema, payload),
    config
  );
}
