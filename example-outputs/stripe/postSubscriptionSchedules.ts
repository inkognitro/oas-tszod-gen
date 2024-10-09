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
} from '@example-outputs/stripe/core';
import {Subscription_schedule, Error} from '@example-outputs/stripe';

export const postSubscriptionSchedulesEndpointSchema = {
  path: '/v1/subscription_schedules',
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

export type PostSubscriptionSchedulesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer?: string;
      default_settings?: {
        application_fee_percent?: number;
        automatic_tax?: {
          enabled: boolean;
          liability?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        billing_cycle_anchor?: 'automatic' | 'phase_start';
        billing_thresholds?: (
          | {
              amount_gte?: number; // int
              reset_billing_cycle_anchor?: boolean;
            }
          | ''
        ) &
          Partial<{
            amount_gte?: number; // int
            reset_billing_cycle_anchor?: boolean;
          }>;
        collection_method?: 'charge_automatically' | 'send_invoice';
        default_payment_method?: string;
        description?: string | '';
        invoice_settings?: {
          account_tax_ids?: string[] | '';
          days_until_due?: number; // int
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        on_behalf_of?: string | '';
        transfer_data?: (
          | {
              amount_percent?: number;
              destination: string;
            }
          | ''
        ) &
          Partial<{
            amount_percent?: number;
            destination: string;
          }>;
      };
      end_behavior?: 'cancel' | 'none' | 'release' | 'renew';
      expand?: string[];
      from_subscription?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      phases?: {
        add_invoice_items?: {
          discounts?: {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[];
          price?: string;
          price_data?: {
            currency: string;
            product: string;
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
          };
          quantity?: number; // int
          tax_rates?: string[] | '';
        }[];
        application_fee_percent?: number;
        automatic_tax?: {
          enabled: boolean;
          liability?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        billing_cycle_anchor?: 'automatic' | 'phase_start';
        billing_thresholds?: (
          | {
              amount_gte?: number; // int
              reset_billing_cycle_anchor?: boolean;
            }
          | ''
        ) &
          Partial<{
            amount_gte?: number; // int
            reset_billing_cycle_anchor?: boolean;
          }>;
        collection_method?: 'charge_automatically' | 'send_invoice';
        coupon?: string;
        currency?: string;
        default_payment_method?: string;
        default_tax_rates?: string[] | '';
        description?: string | '';
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        end_date?: number; // int
        invoice_settings?: {
          account_tax_ids?: string[] | '';
          days_until_due?: number; // int
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        items: {
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
          metadata?: {
            [key: string]: string;
          };
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
          quantity?: number; // int
          tax_rates?: string[] | '';
        }[];
        iterations?: number; // int
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
        proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
        transfer_data?: {
          amount_percent?: number;
          destination: string;
        };
        trial?: boolean;
        trial_end?: number; // int
      }[];
      start_date?: number | 'now';
    }
  >
>;

export type PostSubscriptionSchedulesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Subscription_schedule>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionSchedulesRequestResult = RequestResult<
  PostSubscriptionSchedulesRequest,
  PostSubscriptionSchedulesResponse
>;

export function postSubscriptionSchedules(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionSchedulesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionSchedulesRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionSchedulesEndpointSchema, payload),
    config
  );
}
