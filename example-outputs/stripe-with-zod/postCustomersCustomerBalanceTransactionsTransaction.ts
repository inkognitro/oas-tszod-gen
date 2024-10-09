import {
  z_Customer_balance_transaction,
  z_Error,
  Customer_balance_transaction,
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

export const postCustomersCustomerBalanceTransactionsTransactionEndpointSchema =
  {
    path: '/v1/customers/{customer}/balance_transactions/{transaction}',
    method: 'post',
    supportedSecuritySchemas: [],
    pathParamsZodSchema: z.object({
      customer: z.string(),
      transaction: z.string(),
    }),
    bodyByContentType: {
      'application/x-www-form-urlencoded': {
        zodSchema: z.object({
          description: z.string().optional(),
          expand: z.array(z.string()).optional(),
          metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        }),
      },
    },
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z_Customer_balance_transaction,
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
