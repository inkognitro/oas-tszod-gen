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

export const postCustomersCustomerBalanceTransactionsEndpointSchema = {
  path: '/v1/customers/{customer}/balance_transactions',
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

export type PostCustomersCustomerBalanceTransactionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
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
  }
>;

export type PostCustomersCustomerBalanceTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Customer_balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerBalanceTransactionsRequestResult =
  RequestResult<
    PostCustomersCustomerBalanceTransactionsRequest,
    PostCustomersCustomerBalanceTransactionsResponse
  >;

export function postCustomersCustomerBalanceTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerBalanceTransactionsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerBalanceTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postCustomersCustomerBalanceTransactionsEndpointSchema,
      payload
    ),
    config
  );
}
