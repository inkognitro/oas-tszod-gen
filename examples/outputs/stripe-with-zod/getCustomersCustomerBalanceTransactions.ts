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

export const getCustomersCustomerBalanceTransactionsEndpointSchema = {
  path: '/v1/customers/{customer}/balance_transactions',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
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
          zodSchema: z.object({
            data: z.array(z_Customer_balance_transaction),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetCustomersCustomerBalanceTransactionsRequest = RequestUnion<
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

export type GetCustomersCustomerBalanceTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Customer_balance_transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerBalanceTransactionsRequestResult =
  RequestResult<
    GetCustomersCustomerBalanceTransactionsRequest,
    GetCustomersCustomerBalanceTransactionsResponse
  >;

export function getCustomersCustomerBalanceTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerBalanceTransactionsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerBalanceTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getCustomersCustomerBalanceTransactionsEndpointSchema,
      payload
    ),
    config
  );
}
