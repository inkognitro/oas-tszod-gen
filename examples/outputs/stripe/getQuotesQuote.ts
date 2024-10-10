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

export const getQuotesQuoteEndpointSchema = {
  path: '/v1/quotes/{quote}',
  method: 'get',
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

export type GetQuotesQuoteRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    quote: string;
  },
  {
    expand?: string[];
  }
>;

export type GetQuotesQuoteResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Quote>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesQuoteRequestResult = RequestResult<
  GetQuotesQuoteRequest,
  GetQuotesQuoteResponse
>;

export function getQuotesQuote(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuoteRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuoteRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesQuoteEndpointSchema, payload),
    config
  );
}
