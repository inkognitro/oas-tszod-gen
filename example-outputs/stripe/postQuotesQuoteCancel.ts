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

export const postQuotesQuoteCancelEndpointSchema = {
  path: '/v1/quotes/{quote}/cancel',
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

export type PostQuotesQuoteCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    quote: string;
  }
>;

export type PostQuotesQuoteCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteCancelRequestResult = RequestResult<
  PostQuotesQuoteCancelRequest,
  PostQuotesQuoteCancelResponse
>;

export function postQuotesQuoteCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteCancelEndpointSchema, payload),
    config
  );
}
