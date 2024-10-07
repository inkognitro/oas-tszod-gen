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

export const addPetEndpointSchema = {
  path: '/pet',
  method: 'post',
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
    '405': {
      bodyByContentType: {},
    },
  },
};

export type AddPetRequest = RequestUnion<
  | RequestBodyData<'application/json', Pet>
  | RequestBodyData<'application/xml', Pet>
  | RequestBodyData<'application/x-www-form-urlencoded', Pet>
>;

export type AddPetResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | Response<405>;

export type AddPetRequestResult = RequestResult<AddPetRequest, AddPetResponse>;

export function addPet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<AddPetRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<AddPetRequestResult> {
  return requestHandler.execute(
    createRequest(addPetEndpointSchema, payload),
    config
  );
}
