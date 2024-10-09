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
import {
  Customer_cash_balance_transaction,
  Error,
} from '@example-outputs/stripe';

export const getCustomersCustomerCashBalanceTransactionsEndpointSchema = {
  path: '/v1/customers/{customer}/cash_balance_transactions',
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

export type GetCustomersCustomerCashBalanceTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCustomersCustomerCashBalanceTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Customer_cash_balance_transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerCashBalanceTransactionsRequestResult =
  RequestResult<
    GetCustomersCustomerCashBalanceTransactionsRequest,
    GetCustomersCustomerCashBalanceTransactionsResponse
  >;

export function getCustomersCustomerCashBalanceTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerCashBalanceTransactionsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerCashBalanceTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerCashBalanceTransactionsEndpointSchema,
      payload
    ),
    config
  );
}
