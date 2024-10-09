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
import {Checkout_Session, Error} from '@example-outputs/stripe';

export const postCheckoutSessionsEndpointSchema = {
  path: '/v1/checkout/sessions',
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

export type PostCheckoutSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      after_expiration?: {
        recovery?: {
          allow_promotion_codes?: boolean;
          enabled: boolean;
        };
      };
      allow_promotion_codes?: boolean;
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      billing_address_collection?: 'auto' | 'required';
      cancel_url?: string;
      client_reference_id?: string;
      consent_collection?: {
        payment_method_reuse_agreement?: {
          position: 'auto' | 'hidden';
        };
        promotions?: 'auto' | 'none';
        terms_of_service?: 'none' | 'required';
      };
      currency?: string;
      custom_fields?: {
        dropdown?: {
          default_value?: string;
          options: {
            label: string;
            value: string;
          }[];
        };
        key: string;
        label: {
          custom: string;
          type: 'custom';
        };
        numeric?: {
          default_value?: string;
          maximum_length?: number; // int
          minimum_length?: number; // int
        };
        optional?: boolean;
        text?: {
          default_value?: string;
          maximum_length?: number; // int
          minimum_length?: number; // int
        };
        type: 'dropdown' | 'numeric' | 'text';
      }[];
      custom_text?: {
        after_submit?: (
          | {
              message: string;
            }
          | ''
        ) &
          Partial<{
            message: string;
          }>;
        shipping_address?: (
          | {
              message: string;
            }
          | ''
        ) &
          Partial<{
            message: string;
          }>;
        submit?: (
          | {
              message: string;
            }
          | ''
        ) &
          Partial<{
            message: string;
          }>;
        terms_of_service_acceptance?: (
          | {
              message: string;
            }
          | ''
        ) &
          Partial<{
            message: string;
          }>;
      };
      customer?: string;
      customer_creation?: 'always' | 'if_required';
      customer_email?: string;
      customer_update?: {
        address?: 'auto' | 'never';
        name?: 'auto' | 'never';
        shipping?: 'auto' | 'never';
      };
      discounts?: {
        coupon?: string;
        promotion_code?: string;
      }[];
      expand?: string[];
      expires_at?: number; // int
      invoice_creation?: {
        enabled: boolean;
        invoice_data?: {
          account_tax_ids?: string[] | '';
          custom_fields?:
            | {
                name: string;
                value: string;
              }[]
            | '';
          description?: string;
          footer?: string;
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
          metadata?: {
            [key: string]: string;
          };
          rendering_options?: (
            | {
                amount_tax_display?:
                  | ''
                  | 'exclude_tax'
                  | 'include_inclusive_tax';
              }
            | ''
          ) &
            Partial<{
              amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
            }>;
        };
      };
      line_items?: {
        adjustable_quantity?: {
          enabled: boolean;
          maximum?: number; // int
          minimum?: number; // int
        };
        dynamic_tax_rates?: string[];
        price?: string;
        price_data?: {
          currency: string;
          product?: string;
          product_data?: {
            description?: string;
            images?: string[];
            metadata?: {
              [key: string]: string;
            };
            name: string;
            tax_code?: string;
          };
          recurring?: {
            interval: 'day' | 'month' | 'week' | 'year';
            interval_count?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
        quantity?: number; // int
        tax_rates?: string[];
      }[];
      locale?:
        | 'auto'
        | 'bg'
        | 'cs'
        | 'da'
        | 'de'
        | 'el'
        | 'en'
        | 'en-GB'
        | 'es'
        | 'es-419'
        | 'et'
        | 'fi'
        | 'fil'
        | 'fr'
        | 'fr-CA'
        | 'hr'
        | 'hu'
        | 'id'
        | 'it'
        | 'ja'
        | 'ko'
        | 'lt'
        | 'lv'
        | 'ms'
        | 'mt'
        | 'nb'
        | 'nl'
        | 'pl'
        | 'pt'
        | 'pt-BR'
        | 'ro'
        | 'ru'
        | 'sk'
        | 'sl'
        | 'sv'
        | 'th'
        | 'tr'
        | 'vi'
        | 'zh'
        | 'zh-HK'
        | 'zh-TW';
      metadata?: {
        [key: string]: string;
      };
      mode?: 'payment' | 'setup' | 'subscription';
      payment_intent_data?: {
        application_fee_amount?: number; // int
        capture_method?: 'automatic' | 'automatic_async' | 'manual';
        description?: string;
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
        receipt_email?: string;
        setup_future_usage?: 'off_session' | 'on_session';
        shipping?: {
          address: {
            city?: string;
            country?: string;
            line1: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          carrier?: string;
          name: string;
          phone?: string;
          tracking_number?: string;
        };
        statement_descriptor?: string;
        statement_descriptor_suffix?: string;
        transfer_data?: {
          amount?: number; // int
          destination: string;
        };
        transfer_group?: string;
      };
      payment_method_collection?: 'always' | 'if_required';
      payment_method_configuration?: string;
      payment_method_data?: {
        allow_redisplay?: 'always' | 'limited' | 'unspecified';
      };
      payment_method_options?: {
        acss_debit?: {
          currency?: 'cad' | 'usd';
          mandate_options?: {
            custom_mandate_url?: string | '';
            default_for?: ('invoice' | 'subscription')[];
            interval_description?: string;
            payment_schedule?: 'combined' | 'interval' | 'sporadic';
            transaction_type?: 'business' | 'personal';
          };
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
          verification_method?: 'automatic' | 'instant' | 'microdeposits';
        };
        affirm?: {
          setup_future_usage?: 'none';
        };
        afterpay_clearpay?: {
          setup_future_usage?: 'none';
        };
        alipay?: {
          setup_future_usage?: 'none';
        };
        amazon_pay?: {
          setup_future_usage?: 'none' | 'off_session';
        };
        au_becs_debit?: {
          setup_future_usage?: 'none';
        };
        bacs_debit?: {
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
        };
        bancontact?: {
          setup_future_usage?: 'none';
        };
        boleto?: {
          expires_after_days?: number; // int
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
        };
        card?: {
          installments?: {
            enabled?: boolean;
          };
          request_three_d_secure?: 'any' | 'automatic' | 'challenge';
          setup_future_usage?: 'off_session' | 'on_session';
          statement_descriptor_suffix_kana?: string;
          statement_descriptor_suffix_kanji?: string;
        };
        cashapp?: {
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
        };
        customer_balance?: {
          bank_transfer?: {
            eu_bank_transfer?: {
              country: string;
            };
            requested_address_types?: (
              | 'aba'
              | 'iban'
              | 'sepa'
              | 'sort_code'
              | 'spei'
              | 'swift'
              | 'zengin'
            )[];
            type:
              | 'eu_bank_transfer'
              | 'gb_bank_transfer'
              | 'jp_bank_transfer'
              | 'mx_bank_transfer'
              | 'us_bank_transfer';
          };
          funding_type?: 'bank_transfer';
          setup_future_usage?: 'none';
        };
        eps?: {
          setup_future_usage?: 'none';
        };
        fpx?: {
          setup_future_usage?: 'none';
        };
        giropay?: {
          setup_future_usage?: 'none';
        };
        grabpay?: {
          setup_future_usage?: 'none';
        };
        ideal?: {
          setup_future_usage?: 'none';
        };
        klarna?: {
          setup_future_usage?: 'none';
        };
        konbini?: {
          expires_after_days?: number; // int
          setup_future_usage?: 'none';
        };
        link?: {
          setup_future_usage?: 'none' | 'off_session';
        };
        mobilepay?: {
          setup_future_usage?: 'none';
        };
        multibanco?: {
          setup_future_usage?: 'none';
        };
        oxxo?: {
          expires_after_days?: number; // int
          setup_future_usage?: 'none';
        };
        p24?: {
          setup_future_usage?: 'none';
          tos_shown_and_accepted?: boolean;
        };
        paynow?: {
          setup_future_usage?: 'none';
        };
        paypal?: {
          capture_method?: '' | 'manual';
          preferred_locale?:
            | 'cs-CZ'
            | 'da-DK'
            | 'de-AT'
            | 'de-DE'
            | 'de-LU'
            | 'el-GR'
            | 'en-GB'
            | 'en-US'
            | 'es-ES'
            | 'fi-FI'
            | 'fr-BE'
            | 'fr-FR'
            | 'fr-LU'
            | 'hu-HU'
            | 'it-IT'
            | 'nl-BE'
            | 'nl-NL'
            | 'pl-PL'
            | 'pt-PT'
            | 'sk-SK'
            | 'sv-SE';
          reference?: string;
          risk_correlation_id?: string;
          setup_future_usage?: '' | 'none' | 'off_session';
        };
        pix?: {
          expires_after_seconds?: number; // int
        };
        revolut_pay?: {
          setup_future_usage?: 'none' | 'off_session';
        };
        sepa_debit?: {
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
        };
        sofort?: {
          setup_future_usage?: 'none';
        };
        swish?: {
          reference?: string;
        };
        us_bank_account?: {
          financial_connections?: {
            permissions?: (
              | 'balances'
              | 'ownership'
              | 'payment_method'
              | 'transactions'
            )[];
            prefetch?: ('balances' | 'ownership' | 'transactions')[];
          };
          setup_future_usage?: 'none' | 'off_session' | 'on_session';
          verification_method?: 'automatic' | 'instant';
        };
        wechat_pay?: {
          app_id?: string;
          client: 'android' | 'ios' | 'web';
          setup_future_usage?: 'none';
        };
      };
      payment_method_types?: (
        | 'acss_debit'
        | 'affirm'
        | 'afterpay_clearpay'
        | 'alipay'
        | 'amazon_pay'
        | 'au_becs_debit'
        | 'bacs_debit'
        | 'bancontact'
        | 'blik'
        | 'boleto'
        | 'card'
        | 'cashapp'
        | 'customer_balance'
        | 'eps'
        | 'fpx'
        | 'giropay'
        | 'grabpay'
        | 'ideal'
        | 'klarna'
        | 'konbini'
        | 'link'
        | 'mobilepay'
        | 'multibanco'
        | 'oxxo'
        | 'p24'
        | 'paynow'
        | 'paypal'
        | 'pix'
        | 'promptpay'
        | 'revolut_pay'
        | 'sepa_debit'
        | 'sofort'
        | 'swish'
        | 'twint'
        | 'us_bank_account'
        | 'wechat_pay'
        | 'zip'
      )[];
      phone_number_collection?: {
        enabled: boolean;
      };
      redirect_on_completion?: 'always' | 'if_required' | 'never';
      return_url?: string;
      saved_payment_method_options?: {
        allow_redisplay_filters?: ('always' | 'limited' | 'unspecified')[];
        payment_method_save?: 'disabled' | 'enabled';
      };
      setup_intent_data?: {
        description?: string;
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
      };
      shipping_address_collection?: {
        allowed_countries: (
          | 'AC'
          | 'AD'
          | 'AE'
          | 'AF'
          | 'AG'
          | 'AI'
          | 'AL'
          | 'AM'
          | 'AO'
          | 'AQ'
          | 'AR'
          | 'AT'
          | 'AU'
          | 'AW'
          | 'AX'
          | 'AZ'
          | 'BA'
          | 'BB'
          | 'BD'
          | 'BE'
          | 'BF'
          | 'BG'
          | 'BH'
          | 'BI'
          | 'BJ'
          | 'BL'
          | 'BM'
          | 'BN'
          | 'BO'
          | 'BQ'
          | 'BR'
          | 'BS'
          | 'BT'
          | 'BV'
          | 'BW'
          | 'BY'
          | 'BZ'
          | 'CA'
          | 'CD'
          | 'CF'
          | 'CG'
          | 'CH'
          | 'CI'
          | 'CK'
          | 'CL'
          | 'CM'
          | 'CN'
          | 'CO'
          | 'CR'
          | 'CV'
          | 'CW'
          | 'CY'
          | 'CZ'
          | 'DE'
          | 'DJ'
          | 'DK'
          | 'DM'
          | 'DO'
          | 'DZ'
          | 'EC'
          | 'EE'
          | 'EG'
          | 'EH'
          | 'ER'
          | 'ES'
          | 'ET'
          | 'FI'
          | 'FJ'
          | 'FK'
          | 'FO'
          | 'FR'
          | 'GA'
          | 'GB'
          | 'GD'
          | 'GE'
          | 'GF'
          | 'GG'
          | 'GH'
          | 'GI'
          | 'GL'
          | 'GM'
          | 'GN'
          | 'GP'
          | 'GQ'
          | 'GR'
          | 'GS'
          | 'GT'
          | 'GU'
          | 'GW'
          | 'GY'
          | 'HK'
          | 'HN'
          | 'HR'
          | 'HT'
          | 'HU'
          | 'ID'
          | 'IE'
          | 'IL'
          | 'IM'
          | 'IN'
          | 'IO'
          | 'IQ'
          | 'IS'
          | 'IT'
          | 'JE'
          | 'JM'
          | 'JO'
          | 'JP'
          | 'KE'
          | 'KG'
          | 'KH'
          | 'KI'
          | 'KM'
          | 'KN'
          | 'KR'
          | 'KW'
          | 'KY'
          | 'KZ'
          | 'LA'
          | 'LB'
          | 'LC'
          | 'LI'
          | 'LK'
          | 'LR'
          | 'LS'
          | 'LT'
          | 'LU'
          | 'LV'
          | 'LY'
          | 'MA'
          | 'MC'
          | 'MD'
          | 'ME'
          | 'MF'
          | 'MG'
          | 'MK'
          | 'ML'
          | 'MM'
          | 'MN'
          | 'MO'
          | 'MQ'
          | 'MR'
          | 'MS'
          | 'MT'
          | 'MU'
          | 'MV'
          | 'MW'
          | 'MX'
          | 'MY'
          | 'MZ'
          | 'NA'
          | 'NC'
          | 'NE'
          | 'NG'
          | 'NI'
          | 'NL'
          | 'NO'
          | 'NP'
          | 'NR'
          | 'NU'
          | 'NZ'
          | 'OM'
          | 'PA'
          | 'PE'
          | 'PF'
          | 'PG'
          | 'PH'
          | 'PK'
          | 'PL'
          | 'PM'
          | 'PN'
          | 'PR'
          | 'PS'
          | 'PT'
          | 'PY'
          | 'QA'
          | 'RE'
          | 'RO'
          | 'RS'
          | 'RU'
          | 'RW'
          | 'SA'
          | 'SB'
          | 'SC'
          | 'SE'
          | 'SG'
          | 'SH'
          | 'SI'
          | 'SJ'
          | 'SK'
          | 'SL'
          | 'SM'
          | 'SN'
          | 'SO'
          | 'SR'
          | 'SS'
          | 'ST'
          | 'SV'
          | 'SX'
          | 'SZ'
          | 'TA'
          | 'TC'
          | 'TD'
          | 'TF'
          | 'TG'
          | 'TH'
          | 'TJ'
          | 'TK'
          | 'TL'
          | 'TM'
          | 'TN'
          | 'TO'
          | 'TR'
          | 'TT'
          | 'TV'
          | 'TW'
          | 'TZ'
          | 'UA'
          | 'UG'
          | 'US'
          | 'UY'
          | 'UZ'
          | 'VA'
          | 'VC'
          | 'VE'
          | 'VG'
          | 'VN'
          | 'VU'
          | 'WF'
          | 'WS'
          | 'XK'
          | 'YE'
          | 'YT'
          | 'ZA'
          | 'ZM'
          | 'ZW'
          | 'ZZ'
        )[];
      };
      shipping_options?: {
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
      }[];
      submit_type?: 'auto' | 'book' | 'donate' | 'pay';
      subscription_data?: {
        application_fee_percent?: number;
        billing_cycle_anchor?: number; // int
        default_tax_rates?: string[];
        description?: string;
        invoice_settings?: {
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
        proration_behavior?: 'create_prorations' | 'none';
        transfer_data?: {
          amount_percent?: number;
          destination: string;
        };
        trial_end?: number; // int
        trial_period_days?: number; // int
        trial_settings?: {
          end_behavior: {
            missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
          };
        };
      };
      success_url?: string;
      tax_id_collection?: {
        enabled: boolean;
        required?: 'if_supported' | 'never';
      };
      ui_mode?: 'embedded' | 'hosted';
    }
  >
>;

export type PostCheckoutSessionsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Checkout_Session>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCheckoutSessionsRequestResult = RequestResult<
  PostCheckoutSessionsRequest,
  PostCheckoutSessionsResponse
>;

export function postCheckoutSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCheckoutSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCheckoutSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postCheckoutSessionsEndpointSchema, payload),
    config
  );
}
