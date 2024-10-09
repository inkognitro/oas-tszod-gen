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
import {Quote, Error} from '@example-outputs/stripe';

export const postQuotesQuoteFinalizeEndpointSchema = {
  path: '/v1/quotes/{quote}/finalize',
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

export type PostQuotesQuoteFinalizeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      expires_at?: number; // int
    }
  >,
  {
    quote: string;
  }
>;

export type PostQuotesQuoteFinalizeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteFinalizeRequestResult = RequestResult<
  PostQuotesQuoteFinalizeRequest,
  PostQuotesQuoteFinalizeResponse
>;

export function postQuotesQuoteFinalize(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteFinalizeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteFinalizeRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteFinalizeEndpointSchema, payload),
    config
  );
}
