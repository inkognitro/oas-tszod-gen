import {
  z_Financial_connections_Transaction,
  z_Error,
  Financial_connections_Transaction,
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

export const getFinancialConnectionsTransactionsEndpointSchema = {
  path: '/v1/financial_connections/transactions',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    account: z.string(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    transacted_at: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    transaction_refresh: z
      .object({
        after: z.string(),
      })
      .optional(),
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
            data: z.array(z_Financial_connections_Transaction),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z
              .string()
              .regex(/\^\/v1\/financial_connections\/transactions/),
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

export type GetFinancialConnectionsTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    account: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    transacted_at?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    transaction_refresh?: {
      after: string;
    };
  }
>;

export type GetFinancialConnectionsTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsTransactionsRequestResult = RequestResult<
  GetFinancialConnectionsTransactionsRequest,
  GetFinancialConnectionsTransactionsResponse
>;

export function getFinancialConnectionsTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsTransactionsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getFinancialConnectionsTransactionsEndpointSchema, payload),
    config
  );
}
