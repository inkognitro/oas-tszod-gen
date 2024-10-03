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

export const findPetsByStatusEndpointSchema = {
  path: '/pet/findByStatus',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  queryParamsZodSchema: z.object({
    status: z.enum(['available', 'pending', 'sold']).optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {
          zodSchema: z.array(petZodSchema),
        },
        'application/json': {
          zodSchema: z.array(petZodSchema),
        },
      },
    },
    '400': {
      bodyByContentType: {},
    },
  },
};

export type FindPetsByStatusRequest = RequestUnion<
  any,
  any,
  {
    status?: 'available' | 'pending' | 'sold';
  }
>;

export type FindPetsByStatusResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet[]>
      | ResponseBodyData<'application/json', Pet[]>
    >
  | ResponseUnion<400>;

export type FindPetsByStatusRequestResult = RequestResult<
  FindPetsByStatusRequest,
  FindPetsByStatusResponse
>;

export function findPetsByStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<FindPetsByStatusRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<FindPetsByStatusRequestResult> {
  return requestHandler.execute(
    createRequest(findPetsByStatusEndpointSchema, payload),
    config
  );
}
