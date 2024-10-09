import {
  z_Shipping_rate,
  z_Error,
  Shipping_rate,
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

export const postShippingRatesShippingRateTokenEndpointSchema = {
  path: '/v1/shipping_rates/{shipping_rate_token}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    shipping_rate_token: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        fixed_amount: z
          .object({
            currency_options: z
              .record(
                z.object({
                  amount: z.number().int().safe().finite().optional(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                })
              )
              .optional(),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        tax_behavior: z
          .enum(['exclusive', 'inclusive', 'unspecified'])
          .optional(),
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

export type PostShippingRatesShippingRateTokenRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      fixed_amount?: {
        currency_options?: {
          [key: string]: {
            amount?: number; // int
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          };
        };
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
    }
  >,
  {
    shipping_rate_token: string;
  }
>;

export type PostShippingRatesShippingRateTokenResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Shipping_rate>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostShippingRatesShippingRateTokenRequestResult = RequestResult<
  PostShippingRatesShippingRateTokenRequest,
  PostShippingRatesShippingRateTokenResponse
>;

export function postShippingRatesShippingRateToken(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostShippingRatesShippingRateTokenRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostShippingRatesShippingRateTokenRequestResult> {
  return requestHandler.execute(
    createRequest(postShippingRatesShippingRateTokenEndpointSchema, payload),
    config
  );
}
