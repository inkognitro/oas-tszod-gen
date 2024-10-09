import {z_Price, z_Error, Price, Error} from '@example-outputs/stripe-with-zod';
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

export const getPricesEndpointSchema = {
  path: '/v1/prices',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    active: z.boolean().optional(),
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
    lookup_keys: z.array(z.string()).optional(),
    product: z.string().optional(),
    recurring: z
      .object({
        interval: z.enum(['day', 'month', 'week', 'year']).optional(),
        meter: z.string().optional(),
        usage_type: z.enum(['licensed', 'metered']).optional(),
      })
      .optional(),
    starting_after: z.string().optional(),
    type: z.enum(['one_time', 'recurring']).optional(),
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
            data: z.array(z_Price),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/prices/),
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

export type GetPricesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    active?: boolean;
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
    lookup_keys?: string[];
    product?: string;
    recurring?: {
      interval?: 'day' | 'month' | 'week' | 'year';
      meter?: string;
      usage_type?: 'licensed' | 'metered';
    };
    starting_after?: string;
    type?: 'one_time' | 'recurring';
  }
>;

export type GetPricesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Price[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPricesRequestResult = RequestResult<
  GetPricesRequest,
  GetPricesResponse
>;

export function getPrices(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPricesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPricesRequestResult> {
  return requestHandler.execute(
    createRequest(getPricesEndpointSchema, payload),
    config
  );
}
