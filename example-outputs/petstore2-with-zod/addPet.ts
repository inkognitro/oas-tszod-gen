import {petZodSchema, Pet} from '@example-outputs/petstore2-with-zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2-with-zod/core';

export const addPetEndpointSchema = {
  path: '/pet',
  method: 'post',
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
    '405': {
      bodyByContentType: {},
    },
  },
};

export type AddPetRequestBody =
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

export type AddPetPayload = AddPetRequestBody;

export type AddPetResponse =
  | Response<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | Response<405>;

export type AddPetRequestResult = RequestResult<Request, AddPetResponse>;

export function addPet(
  requestHandler: SimpleRequestHandler,
  payload: AddPetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<AddPetRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: addPetEndpointSchema}),
    config
  );
}
