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

export const postPricesEndpointSchema = {
  path: '/v1/prices',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        billing_scheme: z.enum(['per_unit', 'tiered']).optional(),
        currency: z.string(),
        currency_options: z
          .record(
            z.object({
              custom_unit_amount: z
                .object({
                  enabled: z.boolean(),
                  maximum: z.number().int().safe().finite().optional(),
                  minimum: z.number().int().safe().finite().optional(),
                  preset: z.number().int().safe().finite().optional(),
                })
                .optional(),
              tax_behavior: z
                .enum(['exclusive', 'inclusive', 'unspecified'])
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
              unit_amount: z.number().int().safe().finite().optional(),
              unit_amount_decimal: z.string().optional(),
            })
          )
          .optional(),
        custom_unit_amount: z
          .object({
            enabled: z.boolean(),
            maximum: z.number().int().safe().finite().optional(),
            minimum: z.number().int().safe().finite().optional(),
            preset: z.number().int().safe().finite().optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        lookup_key: z.string().optional(),
        metadata: z.record(z.string()).optional(),
        nickname: z.string().optional(),
        product: z.string().optional(),
        product_data: z
          .object({
            active: z.boolean().optional(),
            id: z.string().optional(),
            metadata: z.record(z.string()).optional(),
            name: z.string(),
            statement_descriptor: z.string().optional(),
            tax_code: z.string().optional(),
            unit_label: z.string().optional(),
          })
          .optional(),
        recurring: z
          .object({
            aggregate_usage: z
              .enum(['last_during_period', 'last_ever', 'max', 'sum'])
              .optional(),
            interval: z.enum(['day', 'month', 'week', 'year']),
            interval_count: z.number().int().safe().finite().optional(),
            meter: z.string().optional(),
            usage_type: z.enum(['licensed', 'metered']).optional(),
          })
          .optional(),
        tax_behavior: z
          .enum(['exclusive', 'inclusive', 'unspecified'])
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
        transfer_lookup_key: z.boolean().optional(),
        transform_quantity: z
          .object({
            divide_by: z.number().int().safe().finite(),
            round: z.enum(['down', 'up']),
          })
          .optional(),
        unit_amount: z.number().int().safe().finite().optional(),
        unit_amount_decimal: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Price,
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

export type PostPricesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      billing_scheme?: 'per_unit' | 'tiered';
      currency: string;
      currency_options?: {
        [key: string]: {
          custom_unit_amount?: {
            enabled: boolean;
            maximum?: number; // int
            minimum?: number; // int
            preset?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          tiers?: {
            flat_amount?: number; // int
            flat_amount_decimal?: string; // decimal
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
            up_to: 'inf' | number;
          }[];
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
      };
      custom_unit_amount?: {
        enabled: boolean;
        maximum?: number; // int
        minimum?: number; // int
        preset?: number; // int
      };
      expand?: string[];
      lookup_key?: string;
      metadata?: {
        [key: string]: string;
      };
      nickname?: string;
      product?: string;
      product_data?: {
        active?: boolean;
        id?: string;
        metadata?: {
          [key: string]: string;
        };
        name: string;
        statement_descriptor?: string;
        tax_code?: string;
        unit_label?: string;
      };
      recurring?: {
        aggregate_usage?: 'last_during_period' | 'last_ever' | 'max' | 'sum';
        interval: 'day' | 'month' | 'week' | 'year';
        interval_count?: number; // int
        meter?: string;
        usage_type?: 'licensed' | 'metered';
      };
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tiers?: {
        flat_amount?: number; // int
        flat_amount_decimal?: string; // decimal
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
        up_to: 'inf' | number;
      }[];
      tiers_mode?: 'graduated' | 'volume';
      transfer_lookup_key?: boolean;
      transform_quantity?: {
        divide_by: number; // int
        round: 'down' | 'up';
      };
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }
  >
>;

export type PostPricesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPricesRequestResult = RequestResult<
  PostPricesRequest,
  PostPricesResponse
>;

export function postPrices(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPricesRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPricesRequestResult> {
  return requestHandler.execute(
    createRequest(postPricesEndpointSchema, payload),
    config
  );
}
