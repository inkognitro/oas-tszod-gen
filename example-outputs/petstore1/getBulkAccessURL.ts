import {BulkObjectAccessId} from '@example-outputs/petstore1';
import {
  RequestUnion,
  RequestBodyData,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore1/core';

export const getBulkAccessURLEndpointSchema = {
  path: '/objects/access',
  method: 'post',
  supportedSecuritySchemas: [{name: 'PassportAuth', scopes: []}],
  bodyByContentType: {
    'application/json': {},
  },
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
    '413': {
      bodyByContentType: {},
    },
    '500': {
      bodyByContentType: {},
    },
  },
};

export type GetBulkAccessURLRequest = RequestUnion<
  RequestBodyData<'application/json', BulkObjectAccessId>
>;

export type GetBulkAccessURLResponse =
  | Response<200>
  | Response<202>
  | Response<400>
  | Response<401>
  | Response<403>
  | Response<404>
  | Response<413>
  | Response<500>;

export type GetBulkAccessURLRequestResult = RequestResult<
  GetBulkAccessURLRequest,
  GetBulkAccessURLResponse
>;

export function getBulkAccessURL(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBulkAccessURLRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBulkAccessURLRequestResult> {
  return requestHandler.execute(
    createRequest(getBulkAccessURLEndpointSchema, payload),
    config
  );
}
