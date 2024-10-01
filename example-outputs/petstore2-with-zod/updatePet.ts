import {petZodSchema, Pet} from '@example-outputs/petstore2-with-zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | ResponseUnion<400>
  | ResponseUnion<404>
  | ResponseUnion<405>;

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
