import {petZodSchema, Pet} from '@example-outputs/petstore2-with-zod';
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

export type FindPetsByTagsPayload = {
  queryParams: {
    tags?: string[];
  };
};

export type FindPetsByTagsResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet[]>
      | ResponseBodyData<'application/json', Pet[]>
    >
  | ResponseUnion<400>;

export type FindPetsByTagsRequestResult = RequestResult<
  Request,
  FindPetsByTagsResponse
>;

export function findPetsByTags(
  requestHandler: SimpleRequestHandler,
  payload: FindPetsByTagsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<FindPetsByTagsRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: findPetsByTagsEndpointSchema}),
    config
  );
}
