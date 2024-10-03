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

export const deletePetEndpointSchema = {
  path: '/pet/{petId}',
  method: 'delete',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  pathParamsZodSchema: z.object({
    petId: z.number().int().safe().finite(),
  }),
  headersZodSchema: z.object({
    api_key: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '400': {
      bodyByContentType: {},
    },
  },
};

export type DeletePetRequest = RequestUnion<
  any,
  {
    petId: number; // int
  },
  any,
  {
    api_key?: string;
  }
>;

export type DeletePetResponse = ResponseUnion<400>;

export type DeletePetRequestResult = RequestResult<
  DeletePetRequest,
  DeletePetResponse
>;

export function deletePet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeletePetRequest, 'pathParams' | 'headers'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeletePetRequestResult> {
  return requestHandler.execute(
    createRequest(deletePetEndpointSchema, payload),
    config
  );
}
