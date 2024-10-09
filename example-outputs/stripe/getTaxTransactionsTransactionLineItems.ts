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
import {Tax_Transaction_line_item, Error} from '@example-outputs/stripe';

export const getTaxTransactionsTransactionLineItemsEndpointSchema = {
  path: '/v1/tax/transactions/{transaction}/line_items',
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

export type GetTaxTransactionsTransactionLineItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetTaxTransactionsTransactionLineItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Tax_Transaction_line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxTransactionsTransactionLineItemsRequestResult = RequestResult<
  GetTaxTransactionsTransactionLineItemsRequest,
  GetTaxTransactionsTransactionLineItemsResponse
>;

export function getTaxTransactionsTransactionLineItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxTransactionsTransactionLineItemsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxTransactionsTransactionLineItemsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTaxTransactionsTransactionLineItemsEndpointSchema,
      payload
    ),
    config
  );
}
