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
import {Item, Error} from '@example-outputs/stripe';

export const getQuotesQuoteLineItemsEndpointSchema = {
  path: '/v1/quotes/{quote}/line_items',
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

export type GetQuotesQuoteLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    quote: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetQuotesQuoteLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesQuoteLineItemsRequestResult = RequestResult<
  GetQuotesQuoteLineItemsRequest,
  GetQuotesQuoteLineItemsResponse
>;

export function getQuotesQuoteLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuoteLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuoteLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesQuoteLineItemsEndpointSchema, payload),
    config
  );
}
