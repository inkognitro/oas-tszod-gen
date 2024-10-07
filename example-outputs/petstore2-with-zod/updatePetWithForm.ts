import {z} from 'zod';
import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const updatePetWithFormEndpointSchema = {
  path: '/pet/{petId}',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  queryParamsZodSchema: z.object({
    name: z.string().optional(),
    status: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    petId: z.number().int().safe().finite(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '405': {
      bodyByContentType: {},
    },
  },
};

export type UpdatePetWithFormRequest = RequestUnion<
  any,
  {
    petId: number; // int
  },
  {
    name?: string;
    status?: string;
  }
>;

export type UpdatePetWithFormResponse = Response<405>;

export type UpdatePetWithFormRequestResult = RequestResult<
  UpdatePetWithFormRequest,
  UpdatePetWithFormResponse
>;

export function updatePetWithForm(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    UpdatePetWithFormRequest,
    'pathParams' | 'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetWithFormRequestResult> {
  return requestHandler.execute(
    createRequest(updatePetWithFormEndpointSchema, payload),
    config
  );
}
