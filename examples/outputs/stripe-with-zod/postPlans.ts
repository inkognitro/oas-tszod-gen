import {z_Plan, z_Error, Plan, Error} from './schemas';
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

export const postPlansEndpointSchema = {
  path: '/v1/plans',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        aggregate_usage: z
          .enum(['last_during_period', 'last_ever', 'max', 'sum'])
          .optional(),
        amount: z.number().int().safe().finite().optional(),
        amount_decimal: z.string().optional(),
        billing_scheme: z.enum(['per_unit', 'tiered']).optional(),
        currency: z.string(),
        expand: z.array(z.string()).optional(),
        id: z.string().optional(),
        interval: z.enum(['day', 'month', 'week', 'year']),
        interval_count: z.number().int().safe().finite().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        meter: z.string().optional(),
        nickname: z.string().optional(),
        product: z
          .union([
            z.object({
              active: z.boolean().optional(),
              id: z.string().optional(),
              metadata: z.record(z.string()).optional(),
              name: z.string(),
              statement_descriptor: z.string().optional(),
              tax_code: z.string().optional(),
              unit_label: z.string().optional(),
            }),
            z.string(),
          ])
          .optional(),
        tiers: z
          .array(
            z.object({
              flat_amount: z.number().int().safe().finite().optional(),
              flat_amount_decimal: z.string().optional(),
              unit_amount: z.number().int().safe().finite().optional(),
              unit_amount_decimal: z.string().optional(),
              up_to: z.union([
                z.enum(['inf']),
                z.number().int().safe().finite(),
              ]),
            })
          )
          .optional(),
        tiers_mode: z.enum(['graduated', 'volume']).optional(),
        transform_usage: z
          .object({
            divide_by: z.number().int().safe().finite(),
            round: z.enum(['down', 'up']),
          })
          .optional(),
        trial_period_days: z.number().int().safe().finite().optional(),
        usage_type: z.enum(['licensed', 'metered']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Plan,
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

export type PostPlansRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum';
      amount?: number; // int
      amount_decimal?: string; // decimal
      billing_scheme?: 'per_unit' | 'tiered';
      currency: string;
      expand?: string[];
      id?: string;
      interval: 'day' | 'month' | 'week' | 'year';
      interval_count?: number; // int
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      meter?: string;
      nickname?: string;
      product?: (
        | {
            active?: boolean;
            id?: string;
            metadata?: {
              [key: string]: string;
            };
            name: string;
            statement_descriptor?: string;
            tax_code?: string;
            unit_label?: string;
          }
        | string
      ) &
        Partial<{
          active?: boolean;
          id?: string;
          metadata?: {
            [key: string]: string;
          };
          name: string;
          statement_descriptor?: string;
          tax_code?: string;
          unit_label?: string;
        }>;
      tiers?: {
        flat_amount?: number; // int
        flat_amount_decimal?: string; // decimal
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
        up_to: 'inf' | number;
      }[];
      tiers_mode?: 'graduated' | 'volume';
      transform_usage?: {
        divide_by: number; // int
        round: 'down' | 'up';
      };
      trial_period_days?: number; // int
      usage_type?: 'licensed' | 'metered';
    }
  >
>;

export type PostPlansResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Plan>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPlansRequestResult = RequestResult<
  PostPlansRequest,
  PostPlansResponse
>;

export function postPlans(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPlansRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPlansRequestResult> {
  return requestHandler.execute(
    createRequest(postPlansEndpointSchema, payload),
    config
  );
}
