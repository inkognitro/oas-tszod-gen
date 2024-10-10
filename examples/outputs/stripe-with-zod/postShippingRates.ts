import {z_Shipping_rate, z_Error, Shipping_rate, Error} from './schemas';
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

export const postShippingRatesEndpointSchema = {
  path: '/v1/shipping_rates',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        delivery_estimate: z
          .object({
            maximum: z
              .object({
                unit: z.enum(['business_day', 'day', 'hour', 'month', 'week']),
                value: z.number().int().safe().finite(),
              })
              .optional(),
            minimum: z
              .object({
                unit: z.enum(['business_day', 'day', 'hour', 'month', 'week']),
                value: z.number().int().safe().finite(),
              })
              .optional(),
          })
          .optional(),
        display_name: z.string(),
        expand: z.array(z.string()).optional(),
        fixed_amount: z
          .object({
            amount: z.number().int().safe().finite(),
            currency: z.string(),
            currency_options: z
              .record(
                z.object({
                  amount: z.number().int().safe().finite(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                })
              )
              .optional(),
          })
          .optional(),
        metadata: z.record(z.string()).optional(),
        tax_behavior: z
          .enum(['exclusive', 'inclusive', 'unspecified'])
          .optional(),
        tax_code: z.string().optional(),
        type: z.enum(['fixed_amount']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Shipping_rate,
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

export type PostShippingRatesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      delivery_estimate?: {
        maximum?: {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
          value: number; // int
        };
        minimum?: {
          unit: 'business_day' | 'day' | 'hour' | 'month' | 'week';
          value: number; // int
        };
      };
      display_name: string;
      expand?: string[];
      fixed_amount?: {
        amount: number; // int
        currency: string;
        currency_options?: {
          [key: string]: {
            amount: number; // int
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          };
        };
      };
      metadata?: {
        [key: string]: string;
      };
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tax_code?: string;
      type?: 'fixed_amount';
    }
  >
>;

export type PostShippingRatesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostShippingRatesRequestResult = RequestResult<
  PostShippingRatesRequest,
  PostShippingRatesResponse
>;

export function postShippingRates(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostShippingRatesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostShippingRatesRequestResult> {
  return requestHandler.execute(
    createRequest(postShippingRatesEndpointSchema, payload),
    config
  );
}
