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
import {Subscription, Error} from './schemas';

export const postCustomersCustomerSubscriptionsEndpointSchema = {
  path: '/v1/customers/{customer}/subscriptions',
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

export type PostCustomersCustomerSubscriptionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
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
      application_fee_percent?: number | '';
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      backdate_start_date?: number; // int
      billing_cycle_anchor?: number; // int
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
      cancel_at?: number; // int
      cancel_at_period_end?: boolean;
      collection_method?: 'charge_automatically' | 'send_invoice';
      coupon?: string;
      currency?: string;
      days_until_due?: number; // int
      default_payment_method?: string;
      default_source?: string;
      default_tax_rates?: string[] | '';
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      expand?: string[];
      invoice_settings?: {
        account_tax_ids?: string[] | '';
        issuer?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      items?: {
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
      payment_settings?: {
        payment_method_options?: {
          acss_debit?: (
            | {
                mandate_options?: {
                  transaction_type?: 'business' | 'personal';
                };
                verification_method?: 'automatic' | 'instant' | 'microdeposits';
              }
            | ''
          ) &
            Partial<{
              mandate_options?: {
                transaction_type?: 'business' | 'personal';
              };
              verification_method?: 'automatic' | 'instant' | 'microdeposits';
            }>;
          bancontact?: (
            | {
                preferred_language?: 'de' | 'en' | 'fr' | 'nl';
              }
            | ''
          ) &
            Partial<{
              preferred_language?: 'de' | 'en' | 'fr' | 'nl';
            }>;
          card?: (
            | {
                mandate_options?: {
                  amount?: number; // int
                  amount_type?: 'fixed' | 'maximum';
                  description?: string;
                };
                network?:
                  | 'amex'
                  | 'cartes_bancaires'
                  | 'diners'
                  | 'discover'
                  | 'eftpos_au'
                  | 'girocard'
                  | 'interac'
                  | 'jcb'
                  | 'mastercard'
                  | 'unionpay'
                  | 'unknown'
                  | 'visa';
                request_three_d_secure?: 'any' | 'automatic' | 'challenge';
              }
            | ''
          ) &
            Partial<{
              mandate_options?: {
                amount?: number; // int
                amount_type?: 'fixed' | 'maximum';
                description?: string;
              };
              network?:
                | 'amex'
                | 'cartes_bancaires'
                | 'diners'
                | 'discover'
                | 'eftpos_au'
                | 'girocard'
                | 'interac'
                | 'jcb'
                | 'mastercard'
                | 'unionpay'
                | 'unknown'
                | 'visa';
              request_three_d_secure?: 'any' | 'automatic' | 'challenge';
            }>;
          customer_balance?: (
            | {
                bank_transfer?: {
                  eu_bank_transfer?: {
                    country: string;
                  };
                  type?: string;
                };
                funding_type?: string;
              }
            | ''
          ) &
            Partial<{
              bank_transfer?: {
                eu_bank_transfer?: {
                  country: string;
                };
                type?: string;
              };
              funding_type?: string;
            }>;
          konbini?: {} | '';
          sepa_debit?: {} | '';
          us_bank_account?: (
            | {
                financial_connections?: {
                  filters?: {
                    account_subcategories?: ('checking' | 'savings')[];
                  };
                  permissions?: (
                    | 'balances'
                    | 'ownership'
                    | 'payment_method'
                    | 'transactions'
                  )[];
                  prefetch?: ('balances' | 'ownership' | 'transactions')[];
                };
                verification_method?: 'automatic' | 'instant' | 'microdeposits';
              }
            | ''
          ) &
            Partial<{
              financial_connections?: {
                filters?: {
                  account_subcategories?: ('checking' | 'savings')[];
                };
                permissions?: (
                  | 'balances'
                  | 'ownership'
                  | 'payment_method'
                  | 'transactions'
                )[];
                prefetch?: ('balances' | 'ownership' | 'transactions')[];
              };
              verification_method?: 'automatic' | 'instant' | 'microdeposits';
            }>;
        };
        payment_method_types?:
          | (
              | 'ach_credit_transfer'
              | 'ach_debit'
              | 'acss_debit'
              | 'amazon_pay'
              | 'au_becs_debit'
              | 'bacs_debit'
              | 'bancontact'
              | 'boleto'
              | 'card'
              | 'cashapp'
              | 'customer_balance'
              | 'eps'
              | 'fpx'
              | 'giropay'
              | 'grabpay'
              | 'ideal'
              | 'konbini'
              | 'link'
              | 'multibanco'
              | 'p24'
              | 'paynow'
              | 'paypal'
              | 'promptpay'
              | 'revolut_pay'
              | 'sepa_debit'
              | 'sofort'
              | 'swish'
              | 'us_bank_account'
              | 'wechat_pay'
            )[]
          | '';
        save_default_payment_method?: 'off' | 'on_subscription';
      };
      pending_invoice_item_interval?: (
        | {
            interval: 'day' | 'month' | 'week' | 'year';
            interval_count?: number; // int
          }
        | ''
      ) &
        Partial<{
          interval: 'day' | 'month' | 'week' | 'year';
          interval_count?: number; // int
        }>;
      promotion_code?: string;
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
      transfer_data?: {
        amount_percent?: number;
        destination: string;
      };
      trial_end?: 'now' | number;
      trial_from_plan?: boolean;
      trial_period_days?: number; // int
      trial_settings?: {
        end_behavior: {
          missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
        };
      };
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerSubscriptionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerSubscriptionsRequestResult = RequestResult<
  PostCustomersCustomerSubscriptionsRequest,
  PostCustomersCustomerSubscriptionsResponse
>;

export function postCustomersCustomerSubscriptions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerSubscriptionsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerSubscriptionsRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerSubscriptionsEndpointSchema, payload),
    config
  );
}
