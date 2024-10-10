import {z_Invoice, z_Error, Invoice, Error} from './schemas';
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

export const postInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account_tax_ids: z
          .union([z.array(z.string()), z.enum([''])])
          .optional(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        auto_advance: z.boolean().optional(),
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
        collection_method: z
          .enum(['charge_automatically', 'send_invoice'])
          .optional(),
        custom_fields: z
          .union([
            z.array(
              z.object({
                name: z.string(),
                value: z.string(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        days_until_due: z.number().int().safe().finite().optional(),
        default_payment_method: z.string().optional(),
        default_source: z.union([z.string(), z.enum([''])]).optional(),
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
        due_date: z.number().int().safe().finite().optional(),
        effective_at: z
          .union([z.number().int().safe().finite(), z.enum([''])])
          .optional(),
        expand: z.array(z.string()).optional(),
        footer: z.string().optional(),
        issuer: z
          .object({
            account: z.string().optional(),
            type: z.enum(['account', 'self']),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        number: z.union([z.string(), z.enum([''])]).optional(),
        on_behalf_of: z.union([z.string(), z.enum([''])]).optional(),
        payment_settings: z
          .object({
            default_mandate: z.union([z.string(), z.enum([''])]).optional(),
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
                      installments: z
                        .object({
                          enabled: z.boolean().optional(),
                          plan: z
                            .union([
                              z.object({
                                count: z
                                  .number()
                                  .int()
                                  .safe()
                                  .finite()
                                  .optional(),
                                interval: z.enum(['month']).optional(),
                                type: z.enum(['fixed_count']),
                              }),
                              z.enum(['']),
                            ])
                            .optional(),
                        })
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
          })
          .optional(),
        rendering: z
          .object({
            amount_tax_display: z
              .enum(['', 'exclude_tax', 'include_inclusive_tax'])
              .optional(),
            pdf: z
              .object({
                page_size: z.enum(['a4', 'auto', 'letter']).optional(),
              })
              .optional(),
            template: z.string().optional(),
            template_version: z
              .union([z.number().int().safe().finite(), z.enum([''])])
              .optional(),
          })
          .optional(),
        shipping_cost: z
          .union([
            z.object({
              shipping_rate: z.string().optional(),
              shipping_rate_data: z
                .object({
                  delivery_estimate: z
                    .object({
                      maximum: z
                        .object({
                          unit: z.enum([
                            'business_day',
                            'day',
                            'hour',
                            'month',
                            'week',
                          ]),
                          value: z.number().int().safe().finite(),
                        })
                        .optional(),
                      minimum: z
                        .object({
                          unit: z.enum([
                            'business_day',
                            'day',
                            'hour',
                            'month',
                            'week',
                          ]),
                          value: z.number().int().safe().finite(),
                        })
                        .optional(),
                    })
                    .optional(),
                  display_name: z.string(),
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
                })
                .optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        shipping_details: z
          .union([
            z.object({
              address: z.object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              }),
              name: z.string(),
              phone: z.union([z.string(), z.enum([''])]).optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        statement_descriptor: z.string().optional(),
        transfer_data: z
          .union([
            z.object({
              amount: z.number().int().safe().finite().optional(),
              destination: z.string(),
            }),
            z.enum(['']),
          ])
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Invoice,
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

export type PostInvoicesInvoiceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_tax_ids?: string[] | '';
      application_fee_amount?: number; // int
      auto_advance?: boolean;
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      collection_method?: 'charge_automatically' | 'send_invoice';
      custom_fields?:
        | {
            name: string;
            value: string;
          }[]
        | '';
      days_until_due?: number; // int
      default_payment_method?: string;
      default_source?: string | '';
      default_tax_rates?: string[] | '';
      description?: string;
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      due_date?: number; // int
      effective_at?: number | '';
      expand?: string[];
      footer?: string;
      issuer?: {
        account?: string;
        type: 'account' | 'self';
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      number?: string | '';
      on_behalf_of?: string | '';
      payment_settings?: {
        default_mandate?: string | '';
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
                installments?: {
                  enabled?: boolean;
                  plan?: (
                    | {
                        count?: number; // int
                        interval?: 'month';
                        type: 'fixed_count';
                      }
                    | ''
                  ) &
                    Partial<{
                      count?: number; // int
                      interval?: 'month';
                      type: 'fixed_count';
                    }>;
                };
                request_three_d_secure?: 'any' | 'automatic' | 'challenge';
              }
            | ''
          ) &
            Partial<{
              installments?: {
                enabled?: boolean;
                plan?: (
                  | {
                      count?: number; // int
                      interval?: 'month';
                      type: 'fixed_count';
                    }
                  | ''
                ) &
                  Partial<{
                    count?: number; // int
                    interval?: 'month';
                    type: 'fixed_count';
                  }>;
              };
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
      };
      rendering?: {
        amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
        pdf?: {
          page_size?: 'a4' | 'auto' | 'letter';
        };
        template?: string;
        template_version?: number | '';
      };
      shipping_cost?: (
        | {
            shipping_rate?: string;
            shipping_rate_data?: {
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
            };
          }
        | ''
      ) &
        Partial<{
          shipping_rate?: string;
          shipping_rate_data?: {
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
          };
        }>;
      shipping_details?: (
        | {
            address: {
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            };
            name: string;
            phone?: string | '';
          }
        | ''
      ) &
        Partial<{
          address: {
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          name: string;
          phone?: string | '';
        }>;
      statement_descriptor?: string;
      transfer_data?: (
        | {
            amount?: number; // int
            destination: string;
          }
        | ''
      ) &
        Partial<{
          amount?: number; // int
          destination: string;
        }>;
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceRequestResult = RequestResult<
  PostInvoicesInvoiceRequest,
  PostInvoicesInvoiceResponse
>;

export function postInvoicesInvoice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceEndpointSchema, payload),
    config
  );
}
