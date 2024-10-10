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
import {Subscription_item, Error} from './schemas';

export const postSubscriptionItemsEndpointSchema = {
  path: '/v1/subscription_items',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSubscriptionItemsRequest = RequestUnion<
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
      metadata?: {
        [key: string]: string;
      };
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
      subscription: string;
      tax_rates?: string[] | '';
    }
  >
>;

export type PostSubscriptionItemsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription_item>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionItemsRequestResult = RequestResult<
  PostSubscriptionItemsRequest,
  PostSubscriptionItemsResponse
>;

export function postSubscriptionItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionItemsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionItemsRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionItemsEndpointSchema, payload),
    config
  );
}
