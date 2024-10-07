import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1/core';

export const postAccessURLEndpointSchema = {
  path: '/objects/{object_id}/access/{access_id}',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {},
    },
    '202': {
      bodyByContentType: {},
    },
    '400': {
      bodyByContentType: {},
    },
    '401': {
      bodyByContentType: {},
    },
    '403': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
    '500': {
      bodyByContentType: {},
    },
  },
};

export type PostAccessURLRequest = RequestUnion<
  any,
  {
    object_id: string;
    access_id: string;
  }
>;

export type PostAccessURLResponse =
  | Response<200>
  | Response<202>
  | Response<400>
  | Response<401>
  | Response<403>
  | Response<404>
  | Response<500>;

export type PostAccessURLRequestResult = RequestResult<
  PostAccessURLRequest,
  PostAccessURLResponse
>;

export function postAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostAccessURLRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest(postAccessURLEndpointSchema, payload),
    config
  );
}
