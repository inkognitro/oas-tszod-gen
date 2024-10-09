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

export const postCustomersCustomerBalanceTransactionsTransactionEndpointSchema =
  {
    path: '/v1/customers/{customer}/balance_transactions/{transaction}',
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

export type PostCustomersCustomerBalanceTransactionsTransactionRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        description?: string;
        expand?: string[];
        metadata?:
          | {
              [key: string]: string;
            }
          | '';
      }
    >,
    {
      customer: string;
      transaction: string;
    }
  >;

export type PostCustomersCustomerBalanceTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Customer_balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerBalanceTransactionsTransactionRequestResult =
  RequestResult<
    PostCustomersCustomerBalanceTransactionsTransactionRequest,
    PostCustomersCustomerBalanceTransactionsTransactionResponse
  >;

export function postCustomersCustomerBalanceTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerBalanceTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerBalanceTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      postCustomersCustomerBalanceTransactionsTransactionEndpointSchema,
      payload
    ),
    config
  );
}
