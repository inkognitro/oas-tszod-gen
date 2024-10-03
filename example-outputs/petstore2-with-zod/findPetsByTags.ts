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

export const findPetsByTagsEndpointSchema = {
  path: '/pet/findByTags',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  queryParamsZodSchema: z.object({
    tags: z.array(z.string()).optional(),
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

export type FindPetsByTagsRequest = RequestUnion<
  any,
  any,
  {
    tags?: string[];
  }
>;

export type FindPetsByTagsResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet[]>
      | ResponseBodyData<'application/json', Pet[]>
    >
  | ResponseUnion<400>;

export type FindPetsByTagsRequestResult = RequestResult<
  FindPetsByTagsRequest,
  FindPetsByTagsResponse
>;

export function findPetsByTags(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<FindPetsByTagsRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<FindPetsByTagsRequestResult> {
  return requestHandler.execute(
    createRequest(findPetsByTagsEndpointSchema, payload),
    config
  );
}
