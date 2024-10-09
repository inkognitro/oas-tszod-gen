import {
  z_Customer_cash_balance_transaction,
  z_Error,
  Customer_cash_balance_transaction,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getCustomersCustomerCashBalanceTransactionsTransactionEndpointSchema =
  {
    path: '/v1/customers/{customer}/cash_balance_transactions/{transaction}',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
    pathParamsZodSchema: z.object({
      customer: z.string(),
      transaction: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({}),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Customer_cash_balance_transaction,
          },
        },
      },
      default: {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Error,
          },
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
