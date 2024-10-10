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
} from './core';
import {Quote, Error} from './schemas';

export const postQuotesQuoteAcceptEndpointSchema = {
  path: '/v1/quotes/{quote}/accept',
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

export type PostQuotesQuoteAcceptRequest = RequestUnion<
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

export type PostQuotesQuoteAcceptResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostQuotesQuoteAcceptRequestResult = RequestResult<
  PostQuotesQuoteAcceptRequest,
  PostQuotesQuoteAcceptResponse
>;

export function postQuotesQuoteAccept(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostQuotesQuoteAcceptRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostQuotesQuoteAcceptRequestResult> {
  return requestHandler.execute(
    createRequest(postQuotesQuoteAcceptEndpointSchema, payload),
    config
  );
}
