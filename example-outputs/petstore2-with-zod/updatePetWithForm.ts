import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type UpdatePetWithFormPayload = {
  queryParams: {
    name?: string;
    status?: string;
  };
  pathParams: {
    petId: number; // int
  };
};

export type UpdatePetWithFormResponse = ResponseUnion<405>;

export type UpdatePetWithFormRequestResult = RequestResult<
  Request,
  UpdatePetWithFormResponse
>;

export function updatePetWithForm(
  requestHandler: SimpleRequestHandler,
  payload: UpdatePetWithFormPayload,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetWithFormRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: updatePetWithFormEndpointSchema,
    }),
    config
  );
}
