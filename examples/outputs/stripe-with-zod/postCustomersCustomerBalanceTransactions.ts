import {
  z_Customer_balance_transaction,
  z_Error,
  Customer_balance_transaction,
  Error,
} from './schemas';
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
} from './core';

export const postCustomersCustomerBalanceTransactionsEndpointSchema = {
  path: '/v1/customers/{customer}/balance_transactions',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
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
