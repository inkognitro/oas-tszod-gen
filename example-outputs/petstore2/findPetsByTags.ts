import {Pet} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const findPetsByTagsEndpointSchema = {
  path: '/pet/findByTags',
  method: 'get',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
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
