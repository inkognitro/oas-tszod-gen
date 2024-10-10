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
import {Customer_cash_balance_transaction, Error} from './schemas';

export const getCustomersCustomerCashBalanceTransactionsTransactionEndpointSchema =
  {
    path: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
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

export type GetCustomersCustomerCashBalanceTransactionsTransactionRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      customer: string;
      transaction: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetCustomersCustomerCashBalanceTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Customer_cash_balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerCashBalanceTransactionsTransactionRequestResult =
  RequestResult<
    GetCustomersCustomerCashBalanceTransactionsTransactionRequest,
    GetCustomersCustomerCashBalanceTransactionsTransactionResponse
  >;

export function getCustomersCustomerCashBalanceTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerCashBalanceTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerCashBalanceTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerCashBalanceTransactionsTransactionEndpointSchema,
      payload
    ),
    config
  );
}
