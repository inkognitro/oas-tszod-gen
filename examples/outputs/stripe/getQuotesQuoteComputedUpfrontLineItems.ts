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
import {Item, Error} from './schemas';

export const getQuotesQuoteComputedUpfrontLineItemsEndpointSchema = {
  path: '/v1/quotes/{quote}/computed_upfront_line_items',
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

export type GetQuotesQuoteComputedUpfrontLineItemsRequest = RequestUnion<
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

export type GetQuotesQuoteComputedUpfrontLineItemsResponse =
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

export type GetQuotesQuoteComputedUpfrontLineItemsRequestResult = RequestResult<
  GetQuotesQuoteComputedUpfrontLineItemsRequest,
  GetQuotesQuoteComputedUpfrontLineItemsResponse
>;

export function getQuotesQuoteComputedUpfrontLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesQuoteComputedUpfrontLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesQuoteComputedUpfrontLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getQuotesQuoteComputedUpfrontLineItemsEndpointSchema,
      payload
    ),
    config
  );
}
