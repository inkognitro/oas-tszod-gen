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
import {Customer_balance_transaction, Error} from '@example-outputs/stripe';

export const getCustomersCustomerBalanceTransactionsTransactionEndpointSchema =
  {
    path: '/v1/customers/{customer}/balance_transactions/{transaction}',
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

export type GetCustomersCustomerBalanceTransactionsTransactionRequest =
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

export type GetCustomersCustomerBalanceTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Customer_balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerBalanceTransactionsTransactionRequestResult =
  RequestResult<
    GetCustomersCustomerBalanceTransactionsTransactionRequest,
    GetCustomersCustomerBalanceTransactionsTransactionResponse
  >;

export function getCustomersCustomerBalanceTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerBalanceTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerBalanceTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerBalanceTransactionsTransactionEndpointSchema,
      payload
    ),
    config
  );
}
