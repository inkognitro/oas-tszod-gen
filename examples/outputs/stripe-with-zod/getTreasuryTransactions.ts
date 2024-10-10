import {z_Treasury_Transaction, Treasury_Transaction} from './treasury';
import {z_Error, Error} from './schemas';
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

export const getTreasuryTransactionsEndpointSchema = {
  path: '/v1/treasury/transactions',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    created: z
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
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    order_by: z.enum(['created', 'posted_at']).optional(),
    starting_after: z.string().optional(),
    status: z.enum(['open', 'posted', 'void']).optional(),
    status_transitions: z
      .object({
        posted_at: z
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
            data: z.array(z_Treasury_Transaction),
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

export type GetTreasuryTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
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
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    order_by?: 'created' | 'posted_at';
    starting_after?: string;
    status?: 'open' | 'posted' | 'void';
    status_transitions?: {
      posted_at?: (
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
    };
  }
>;

export type GetTreasuryTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionsRequestResult = RequestResult<
  GetTreasuryTransactionsRequest,
  GetTreasuryTransactionsResponse
>;

export function getTreasuryTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionsEndpointSchema, payload),
    config
  );
}
