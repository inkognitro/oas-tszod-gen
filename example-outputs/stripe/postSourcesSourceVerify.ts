import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Source, Error} from '@example-outputs/stripe';

export const postSourcesSourceVerifyEndpointSchema = {
  path: '/v1/sources/{source}/verify',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSourcesSourceVerifyRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      values: string[];
    }
  >,
  {
    source: string;
  }
>;

export type PostSourcesSourceVerifyResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSourcesSourceVerifyRequestResult = RequestResult<
  PostSourcesSourceVerifyRequest,
  PostSourcesSourceVerifyResponse
>;

export function postSourcesSourceVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSourcesSourceVerifyRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSourcesSourceVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(postSourcesSourceVerifyEndpointSchema, payload),
    config
  );
}
