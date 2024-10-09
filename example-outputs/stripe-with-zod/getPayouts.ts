import {
  z_Payout,
  z_Error,
  Payout,
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

export const getPayoutsEndpointSchema = {
  path: '/v1/payouts',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    arrival_date: z
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
    destination: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    status: z.string().optional(),
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
            data: z.array(z_Payout),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/payouts/),
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

export type GetPayoutsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    arrival_date?: (
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
    destination?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: string;
  }
>;

export type GetPayoutsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payout[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPayoutsRequestResult = RequestResult<
  GetPayoutsRequest,
  GetPayoutsResponse
>;

export function getPayouts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPayoutsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPayoutsRequestResult> {
  return requestHandler.execute(
    createRequest(getPayoutsEndpointSchema, payload),
    config
  );
}
