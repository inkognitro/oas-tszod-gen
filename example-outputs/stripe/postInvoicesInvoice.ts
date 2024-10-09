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
import {Invoice, Error} from '@example-outputs/stripe';

export const postInvoicesInvoiceEndpointSchema = {
  path: '/v1/invoices/{invoice}',
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
