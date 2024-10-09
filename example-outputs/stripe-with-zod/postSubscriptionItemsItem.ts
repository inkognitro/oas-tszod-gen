import {
  z_Subscription_item,
  z_Error,
  Subscription_item,
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

export const postSubscriptionItemsItemEndpointSchema = {
  path: '/v1/subscription_items/{item}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    item: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        billing_thresholds: z
          .union([
            z.object({
              usage_gte: z.number().int().safe().finite(),
            }),
            z.enum(['']),
          ])
          .optional(),
        discounts: z
          .union([
            z.array(
              z.object({
                coupon: z.string().optional(),
                discount: z.string().optional(),
                promotion_code: z.string().optional(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        off_session: z.boolean().optional(),
        payment_behavior: z
          .enum([
            'allow_incomplete',
            'default_incomplete',
            'error_if_incomplete',
            'pending_if_incomplete',
          ])
          .optional(),
        price: z.string().optional(),
        price_data: z
          .object({
            currency: z.string(),
            product: z.string(),
            recurring: z.object({
              interval: z.enum(['day', 'month', 'week', 'year']),
              interval_count: z.number().int().safe().finite().optional(),
            }),
            tax_behavior: z
              .enum(['exclusive', 'inclusive', 'unspecified'])
              .optional(),
            unit_amount: z.number().int().safe().finite().optional(),
            unit_amount_decimal: z.string().optional(),
          })
          .optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
        proration_date: z.number().int().safe().finite().optional(),
        quantity: z.number().int().safe().finite().optional(),
        tax_rates: z.union([z.array(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Subscription_item,
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

export type PostSubscriptionItemsItemRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      billing_thresholds?: (
        | {
            usage_gte: number; // int
          }
        | ''
      ) &
        Partial<{
          usage_gte: number; // int
        }>;
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      off_session?: boolean;
      payment_behavior?:
        | 'allow_incomplete'
        | 'default_incomplete'
        | 'error_if_incomplete'
        | 'pending_if_incomplete';
      price?: string;
      price_data?: {
        currency: string;
        product: string;
        recurring: {
          interval: 'day' | 'month' | 'week' | 'year';
          interval_count?: number; // int
        };
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
      proration_date?: number; // int
      quantity?: number; // int
      tax_rates?: string[] | '';
    }
  >,
  {
    item: string;
  }
>;

export type PostSubscriptionItemsItemResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription_item>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionItemsItemRequestResult = RequestResult<
  PostSubscriptionItemsItemRequest,
  PostSubscriptionItemsItemResponse
>;

export function postSubscriptionItemsItem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionItemsItemRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionItemsItemRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionItemsItemEndpointSchema, payload),
    config
  );
}
