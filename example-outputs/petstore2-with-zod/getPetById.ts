import {petZodSchema, Pet} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const getPetByIdEndpointSchema = {
  path: '/pet/{petId}',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'api_key', scopes: []},
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  pathParamsZodSchema: z.object({
    petId: z.number().int().safe().finite(),
  }),
  bodyByContentType: {},
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
  },
};

export type GetPetByIdRequest = RequestUnion<
  any,
  {
    petId: number; // int
  }
>;

export type GetPetByIdResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | ResponseUnion<400>
  | ResponseUnion<404>;

export type GetPetByIdRequestResult = RequestResult<
  GetPetByIdRequest,
  GetPetByIdResponse
>;

export function getPetById(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPetByIdRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPetByIdRequestResult> {
  return requestHandler.execute(
    createRequest(getPetByIdEndpointSchema, payload),
    config
  );
}
