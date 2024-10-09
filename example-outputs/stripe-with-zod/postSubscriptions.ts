import {
  z_Subscription,
  z_Error,
  Subscription,
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

export const postSubscriptionsEndpointSchema = {
  path: '/v1/subscriptions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        add_invoice_items: z
          .array(
            z.object({
              discounts: z
                .array(
                  z.object({
                    coupon: z.string().optional(),
                    discount: z.string().optional(),
                    promotion_code: z.string().optional(),
                  })
                )
                .optional(),
              price: z.string().optional(),
              price_data: z
                .object({
                  currency: z.string(),
                  product: z.string(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                  unit_amount: z.number().int().safe().finite().optional(),
                  unit_amount_decimal: z.string().optional(),
                })
                .optional(),
              quantity: z.number().int().safe().finite().optional(),
              tax_rates: z
                .union([z.array(z.string()), z.enum([''])])
                .optional(),
            })
          )
          .optional(),
        application_fee_percent: z
          .union([z.number().safe().finite(), z.enum([''])])
          .optional(),
        automatic_tax: z
          .object({
            enabled: z.boolean(),
            liability: z
              .object({
                account: z.string().optional(),
                type: z.enum(['account', 'self']),
              })
              .optional(),
          })
          .optional(),
        backdate_start_date: z.number().int().safe().finite().optional(),
        billing_cycle_anchor: z.number().int().safe().finite().optional(),
        billing_cycle_anchor_config: z
          .object({
            day_of_month: z.number().int().safe().finite(),
            hour: z.number().int().safe().finite().optional(),
            minute: z.number().int().safe().finite().optional(),
            month: z.number().int().safe().finite().optional(),
            second: z.number().int().safe().finite().optional(),
          })
          .optional(),
        billing_thresholds: z
          .union([
            z.object({
              amount_gte: z.number().int().safe().finite().optional(),
              reset_billing_cycle_anchor: z.boolean().optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        cancel_at: z.number().int().safe().finite().optional(),
        cancel_at_period_end: z.boolean().optional(),
        collection_method: z
          .enum(['charge_automatically', 'send_invoice'])
          .optional(),
        coupon: z.string().optional(),
        currency: z.string().optional(),
        customer: z.string(),
        days_until_due: z.number().int().safe().finite().optional(),
        default_payment_method: z.string().optional(),
        default_source: z.string().optional(),
        default_tax_rates: z
          .union([z.array(z.string()), z.enum([''])])
          .optional(),
        description: z.string().optional(),
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
        invoice_settings: z
          .object({
            account_tax_ids: z
              .union([z.array(z.string()), z.enum([''])])
              .optional(),
            issuer: z
              .object({
                account: z.string().optional(),
                type: z.enum(['account', 'self']),
              })
              .optional(),
          })
          .optional(),
        items: z
          .array(
            z.object({
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
              metadata: z.record(z.string()).optional(),
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
              quantity: z.number().int().safe().finite().optional(),
              tax_rates: z
                .union([z.array(z.string()), z.enum([''])])
                .optional(),
            })
          )
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        off_session: z.boolean().optional(),
        on_behalf_of: z.union([z.string(), z.enum([''])]).optional(),
        payment_behavior: z
          .enum([
            'allow_incomplete',
            'default_incomplete',
            'error_if_incomplete',
            'pending_if_incomplete',
          ])
          .optional(),
        payment_settings: z
          .object({
            payment_method_options: z
              .object({
                acss_debit: z
                  .union([
                    z.object({
                      mandate_options: z
                        .object({
                          transaction_type: z
                            .enum(['business', 'personal'])
                            .optional(),
                        })
                        .optional(),
                      verification_method: z
                        .enum(['automatic', 'instant', 'microdeposits'])
                        .optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                bancontact: z
                  .union([
                    z.object({
                      preferred_language: z
                        .enum(['de', 'en', 'fr', 'nl'])
                        .optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                card: z
                  .union([
                    z.object({
                      mandate_options: z
                        .object({
                          amount: z.number().int().safe().finite().optional(),
                          amount_type: z.enum(['fixed', 'maximum']).optional(),
                          description: z.string().optional(),
                        })
                        .optional(),
                      network: z
                        .enum([
                          'amex',
                          'cartes_bancaires',
                          'diners',
                          'discover',
                          'eftpos_au',
                          'girocard',
                          'interac',
                          'jcb',
                          'mastercard',
                          'unionpay',
                          'unknown',
                          'visa',
                        ])
                        .optional(),
                      request_three_d_secure: z
                        .enum(['any', 'automatic', 'challenge'])
                        .optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                customer_balance: z
                  .union([
                    z.object({
                      bank_transfer: z
                        .object({
                          eu_bank_transfer: z
                            .object({
                              country: z.string(),
                            })
                            .optional(),
                          type: z.string().optional(),
                        })
                        .optional(),
                      funding_type: z.string().optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                konbini: z.union([z.object({}), z.enum([''])]).optional(),
                sepa_debit: z.union([z.object({}), z.enum([''])]).optional(),
                us_bank_account: z
                  .union([
                    z.object({
                      financial_connections: z
                        .object({
                          filters: z
                            .object({
                              account_subcategories: z
                                .array(z.enum(['checking', 'savings']))
                                .optional(),
                            })
                            .optional(),
                          permissions: z
                            .array(
                              z.enum([
                                'balances',
                                'ownership',
                                'payment_method',
                                'transactions',
                              ])
                            )
                            .optional(),
                          prefetch: z
                            .array(
                              z.enum(['balances', 'ownership', 'transactions'])
                            )
                            .optional(),
                        })
                        .optional(),
                      verification_method: z
                        .enum(['automatic', 'instant', 'microdeposits'])
                        .optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
              })
              .optional(),
            payment_method_types: z
              .union([
                z.array(
                  z.enum([
                    'ach_credit_transfer',
                    'ach_debit',
                    'acss_debit',
                    'amazon_pay',
                    'au_becs_debit',
                    'bacs_debit',
                    'bancontact',
                    'boleto',
                    'card',
                    'cashapp',
                    'customer_balance',
                    'eps',
                    'fpx',
                    'giropay',
                    'grabpay',
                    'ideal',
                    'konbini',
                    'link',
                    'multibanco',
                    'p24',
                    'paynow',
                    'paypal',
                    'promptpay',
                    'revolut_pay',
                    'sepa_debit',
                    'sofort',
                    'swish',
                    'us_bank_account',
                    'wechat_pay',
                  ])
                ),
                z.enum(['']),
              ])
              .optional(),
            save_default_payment_method: z
              .enum(['off', 'on_subscription'])
              .optional(),
          })
          .optional(),
        pending_invoice_item_interval: z
          .union([
            z.object({
              interval: z.enum(['day', 'month', 'week', 'year']),
              interval_count: z.number().int().safe().finite().optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        promotion_code: z.string().optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
        transfer_data: z
          .object({
            amount_percent: z.number().safe().finite().optional(),
            destination: z.string(),
          })
          .optional(),
        trial_end: z
          .union([z.enum(['now']), z.number().int().safe().finite()])
          .optional(),
        trial_from_plan: z.boolean().optional(),
        trial_period_days: z.number().int().safe().finite().optional(),
        trial_settings: z
          .object({
            end_behavior: z.object({
              missing_payment_method: z.enum([
                'cancel',
                'create_invoice',
                'pause',
              ]),
            }),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Subscription,
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

export type PostSubscriptionsRequest = RequestUnion<
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
      billing_cycle_anchor_config?: {
        day_of_month: number; // int
        hour?: number; // int
        minute?: number; // int
        month?: number; // int
        second?: number; // int
      };
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
      customer: string;
      days_until_due?: number; // int
      default_payment_method?: string;
      default_source?: string;
      default_tax_rates?: string[] | '';
      description?: string;
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
      on_behalf_of?: string | '';
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
  >
>;

export type PostSubscriptionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionsRequestResult = RequestResult<
  PostSubscriptionsRequest,
  PostSubscriptionsResponse
>;

export function postSubscriptions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionsRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscriptionsEndpointSchema, payload),
    config
  );
}
