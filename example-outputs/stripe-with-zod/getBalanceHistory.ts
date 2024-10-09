import {
  z_Balance_transaction,
  z_Error,
  Balance_transaction,
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

export const getBalanceHistoryEndpointSchema = {
  path: '/v1/balance/history',
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
    currency: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    payout: z.string().optional(),
    source: z.string().optional(),
    starting_after: z.string().optional(),
    type: z.string().optional(),
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
            data: z.array(z_Balance_transaction),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/balance_transactions/),
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

export type GetBalanceHistoryRequest = RequestUnion<
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
    currency?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payout?: string;
    source?: string;
    starting_after?: string;
    type?: string;
  }
>;

export type GetBalanceHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Balance_transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceHistoryRequestResult = RequestResult<
  GetBalanceHistoryRequest,
  GetBalanceHistoryResponse
>;

export function getBalanceHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceHistoryRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceHistoryEndpointSchema, payload),
    config
  );
}
