import {z_Checkout_Session, Checkout_Session} from './checkout';
import {z_Error, Error} from './schemas';
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

export const postCheckoutSessionsEndpointSchema = {
  path: '/v1/checkout/sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        after_expiration: z
          .object({
            recovery: z
              .object({
                allow_promotion_codes: z.boolean().optional(),
                enabled: z.boolean(),
              })
              .optional(),
          })
          .optional(),
        allow_promotion_codes: z.boolean().optional(),
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
        billing_address_collection: z.enum(['auto', 'required']).optional(),
        cancel_url: z.string().optional(),
        client_reference_id: z.string().optional(),
        consent_collection: z
          .object({
            payment_method_reuse_agreement: z
              .object({
                position: z.enum(['auto', 'hidden']),
              })
              .optional(),
            promotions: z.enum(['auto', 'none']).optional(),
            terms_of_service: z.enum(['none', 'required']).optional(),
          })
          .optional(),
        currency: z.string().optional(),
        custom_fields: z
          .array(
            z.object({
              dropdown: z
                .object({
                  default_value: z.string().optional(),
                  options: z.array(
                    z.object({
                      label: z.string(),
                      value: z.string(),
                    })
                  ),
                })
                .optional(),
              key: z.string(),
              label: z.object({
                custom: z.string(),
                type: z.enum(['custom']),
              }),
              numeric: z
                .object({
                  default_value: z.string().optional(),
                  maximum_length: z.number().int().safe().finite().optional(),
                  minimum_length: z.number().int().safe().finite().optional(),
                })
                .optional(),
              optional: z.boolean().optional(),
              text: z
                .object({
                  default_value: z.string().optional(),
                  maximum_length: z.number().int().safe().finite().optional(),
                  minimum_length: z.number().int().safe().finite().optional(),
                })
                .optional(),
              type: z.enum(['dropdown', 'numeric', 'text']),
            })
          )
          .optional(),
        custom_text: z
          .object({
            after_submit: z
              .union([
                z.object({
                  message: z.string(),
                }),
                z.enum(['']),
              ])
              .optional(),
            shipping_address: z
              .union([
                z.object({
                  message: z.string(),
                }),
                z.enum(['']),
              ])
              .optional(),
            submit: z
              .union([
                z.object({
                  message: z.string(),
                }),
                z.enum(['']),
              ])
              .optional(),
            terms_of_service_acceptance: z
              .union([
                z.object({
                  message: z.string(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        customer: z.string().optional(),
        customer_creation: z.enum(['always', 'if_required']).optional(),
        customer_email: z.string().optional(),
        customer_update: z
          .object({
            address: z.enum(['auto', 'never']).optional(),
            name: z.enum(['auto', 'never']).optional(),
            shipping: z.enum(['auto', 'never']).optional(),
          })
          .optional(),
        discounts: z
          .array(
            z.object({
              coupon: z.string().optional(),
              promotion_code: z.string().optional(),
            })
          )
          .optional(),
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
        invoice_creation: z
          .object({
            enabled: z.boolean(),
            invoice_data: z
              .object({
                account_tax_ids: z
                  .union([z.array(z.string()), z.enum([''])])
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
                description: z.string().optional(),
                footer: z.string().optional(),
                issuer: z
                  .object({
                    account: z.string().optional(),
                    type: z.enum(['account', 'self']),
                  })
                  .optional(),
                metadata: z.record(z.string()).optional(),
                rendering_options: z
                  .union([
                    z.object({
                      amount_tax_display: z
                        .enum(['', 'exclude_tax', 'include_inclusive_tax'])
                        .optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        line_items: z
          .array(
            z.object({
              adjustable_quantity: z
                .object({
                  enabled: z.boolean(),
                  maximum: z.number().int().safe().finite().optional(),
                  minimum: z.number().int().safe().finite().optional(),
                })
                .optional(),
              dynamic_tax_rates: z.array(z.string()).optional(),
              price: z.string().optional(),
              price_data: z
                .object({
                  currency: z.string(),
                  product: z.string().optional(),
                  product_data: z
                    .object({
                      description: z.string().optional(),
                      images: z.array(z.string()).optional(),
                      metadata: z.record(z.string()).optional(),
                      name: z.string(),
                      tax_code: z.string().optional(),
                    })
                    .optional(),
                  recurring: z
                    .object({
                      interval: z.enum(['day', 'month', 'week', 'year']),
                      interval_count: z
                        .number()
                        .int()
                        .safe()
                        .finite()
                        .optional(),
                    })
                    .optional(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                  unit_amount: z.number().int().safe().finite().optional(),
                  unit_amount_decimal: z.string().optional(),
                })
                .optional(),
              quantity: z.number().int().safe().finite().optional(),
              tax_rates: z.array(z.string()).optional(),
            })
          )
          .optional(),
        locale: z
          .enum([
            'auto',
            'bg',
            'cs',
            'da',
            'de',
            'el',
            'en',
            'en-GB',
            'es',
            'es-419',
            'et',
            'fi',
            'fil',
            'fr',
            'fr-CA',
            'hr',
            'hu',
            'id',
            'it',
            'ja',
            'ko',
            'lt',
            'lv',
            'ms',
            'mt',
            'nb',
            'nl',
            'pl',
            'pt',
            'pt-BR',
            'ro',
            'ru',
            'sk',
            'sl',
            'sv',
            'th',
            'tr',
            'vi',
            'zh',
            'zh-HK',
            'zh-TW',
          ])
          .optional(),
        metadata: z.record(z.string()).optional(),
        mode: z.enum(['payment', 'setup', 'subscription']).optional(),
        payment_intent_data: z
          .object({
            application_fee_amount: z.number().int().safe().finite().optional(),
            capture_method: z
              .enum(['automatic', 'automatic_async', 'manual'])
              .optional(),
            description: z.string().optional(),
            metadata: z.record(z.string()).optional(),
            on_behalf_of: z.string().optional(),
            receipt_email: z.string().optional(),
            setup_future_usage: z
              .enum(['off_session', 'on_session'])
              .optional(),
            shipping: z
              .object({
                address: z.object({
                  city: z.string().optional(),
                  country: z.string().optional(),
                  line1: z.string(),
                  line2: z.string().optional(),
                  postal_code: z.string().optional(),
                  state: z.string().optional(),
                }),
                carrier: z.string().optional(),
                name: z.string(),
                phone: z.string().optional(),
                tracking_number: z.string().optional(),
              })
              .optional(),
            statement_descriptor: z.string().optional(),
            statement_descriptor_suffix: z.string().optional(),
            transfer_data: z
              .object({
                amount: z.number().int().safe().finite().optional(),
                destination: z.string(),
              })
              .optional(),
            transfer_group: z.string().optional(),
          })
          .optional(),
        payment_method_collection: z.enum(['always', 'if_required']).optional(),
        payment_method_configuration: z.string().optional(),
        payment_method_data: z
          .object({
            allow_redisplay: z
              .enum(['always', 'limited', 'unspecified'])
              .optional(),
          })
          .optional(),
        payment_method_options: z
          .object({
            acss_debit: z
              .object({
                currency: z.enum(['cad', 'usd']).optional(),
                mandate_options: z
                  .object({
                    custom_mandate_url: z
                      .union([z.string(), z.enum([''])])
                      .optional(),
                    default_for: z
                      .array(z.enum(['invoice', 'subscription']))
                      .optional(),
                    interval_description: z.string().optional(),
                    payment_schedule: z
                      .enum(['combined', 'interval', 'sporadic'])
                      .optional(),
                    transaction_type: z
                      .enum(['business', 'personal'])
                      .optional(),
                  })
                  .optional(),
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
                verification_method: z
                  .enum(['automatic', 'instant', 'microdeposits'])
                  .optional(),
              })
              .optional(),
            affirm: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            afterpay_clearpay: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            alipay: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            amazon_pay: z
              .object({
                setup_future_usage: z.enum(['none', 'off_session']).optional(),
              })
              .optional(),
            au_becs_debit: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            bacs_debit: z
              .object({
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
              })
              .optional(),
            bancontact: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            boleto: z
              .object({
                expires_after_days: z.number().int().safe().finite().optional(),
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
              })
              .optional(),
            card: z
              .object({
                installments: z
                  .object({
                    enabled: z.boolean().optional(),
                  })
                  .optional(),
                request_three_d_secure: z
                  .enum(['any', 'automatic', 'challenge'])
                  .optional(),
                setup_future_usage: z
                  .enum(['off_session', 'on_session'])
                  .optional(),
                statement_descriptor_suffix_kana: z.string().optional(),
                statement_descriptor_suffix_kanji: z.string().optional(),
              })
              .optional(),
            cashapp: z
              .object({
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
              })
              .optional(),
            customer_balance: z
              .object({
                bank_transfer: z
                  .object({
                    eu_bank_transfer: z
                      .object({
                        country: z.string(),
                      })
                      .optional(),
                    requested_address_types: z
                      .array(
                        z.enum([
                          'aba',
                          'iban',
                          'sepa',
                          'sort_code',
                          'spei',
                          'swift',
                          'zengin',
                        ])
                      )
                      .optional(),
                    type: z.enum([
                      'eu_bank_transfer',
                      'gb_bank_transfer',
                      'jp_bank_transfer',
                      'mx_bank_transfer',
                      'us_bank_transfer',
                    ]),
                  })
                  .optional(),
                funding_type: z.enum(['bank_transfer']).optional(),
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            eps: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            fpx: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            giropay: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            grabpay: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            ideal: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            klarna: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            konbini: z
              .object({
                expires_after_days: z.number().int().safe().finite().optional(),
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            link: z
              .object({
                setup_future_usage: z.enum(['none', 'off_session']).optional(),
              })
              .optional(),
            mobilepay: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            multibanco: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            oxxo: z
              .object({
                expires_after_days: z.number().int().safe().finite().optional(),
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            p24: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
                tos_shown_and_accepted: z.boolean().optional(),
              })
              .optional(),
            paynow: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            paypal: z
              .object({
                capture_method: z.enum(['', 'manual']).optional(),
                preferred_locale: z
                  .enum([
                    'cs-CZ',
                    'da-DK',
                    'de-AT',
                    'de-DE',
                    'de-LU',
                    'el-GR',
                    'en-GB',
                    'en-US',
                    'es-ES',
                    'fi-FI',
                    'fr-BE',
                    'fr-FR',
                    'fr-LU',
                    'hu-HU',
                    'it-IT',
                    'nl-BE',
                    'nl-NL',
                    'pl-PL',
                    'pt-PT',
                    'sk-SK',
                    'sv-SE',
                  ])
                  .optional(),
                reference: z.string().optional(),
                risk_correlation_id: z.string().optional(),
                setup_future_usage: z
                  .enum(['', 'none', 'off_session'])
                  .optional(),
              })
              .optional(),
            pix: z
              .object({
                expires_after_seconds: z
                  .number()
                  .int()
                  .safe()
                  .finite()
                  .optional(),
              })
              .optional(),
            revolut_pay: z
              .object({
                setup_future_usage: z.enum(['none', 'off_session']).optional(),
              })
              .optional(),
            sepa_debit: z
              .object({
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
              })
              .optional(),
            sofort: z
              .object({
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
            swish: z
              .object({
                reference: z.string().optional(),
              })
              .optional(),
            us_bank_account: z
              .object({
                financial_connections: z
                  .object({
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
                      .array(z.enum(['balances', 'ownership', 'transactions']))
                      .optional(),
                  })
                  .optional(),
                setup_future_usage: z
                  .enum(['none', 'off_session', 'on_session'])
                  .optional(),
                verification_method: z
                  .enum(['automatic', 'instant'])
                  .optional(),
              })
              .optional(),
            wechat_pay: z
              .object({
                app_id: z.string().optional(),
                client: z.enum(['android', 'ios', 'web']),
                setup_future_usage: z.enum(['none']).optional(),
              })
              .optional(),
          })
          .optional(),
        payment_method_types: z
          .array(
            z.enum([
              'acss_debit',
              'affirm',
              'afterpay_clearpay',
              'alipay',
              'amazon_pay',
              'au_becs_debit',
              'bacs_debit',
              'bancontact',
              'blik',
              'boleto',
              'card',
              'cashapp',
              'customer_balance',
              'eps',
              'fpx',
              'giropay',
              'grabpay',
              'ideal',
              'klarna',
              'konbini',
              'link',
              'mobilepay',
              'multibanco',
              'oxxo',
              'p24',
              'paynow',
              'paypal',
              'pix',
              'promptpay',
              'revolut_pay',
              'sepa_debit',
              'sofort',
              'swish',
              'twint',
              'us_bank_account',
              'wechat_pay',
              'zip',
            ])
          )
          .optional(),
        phone_number_collection: z
          .object({
            enabled: z.boolean(),
          })
          .optional(),
        redirect_on_completion: z
          .enum(['always', 'if_required', 'never'])
          .optional(),
        return_url: z.string().optional(),
        saved_payment_method_options: z
          .object({
            allow_redisplay_filters: z
              .array(z.enum(['always', 'limited', 'unspecified']))
              .optional(),
            payment_method_save: z.enum(['disabled', 'enabled']).optional(),
          })
          .optional(),
        setup_intent_data: z
          .object({
            description: z.string().optional(),
            metadata: z.record(z.string()).optional(),
            on_behalf_of: z.string().optional(),
          })
          .optional(),
        shipping_address_collection: z
          .object({
            allowed_countries: z.array(
              z.enum([
                'AC',
                'AD',
                'AE',
                'AF',
                'AG',
                'AI',
                'AL',
                'AM',
                'AO',
                'AQ',
                'AR',
                'AT',
                'AU',
                'AW',
                'AX',
                'AZ',
                'BA',
                'BB',
                'BD',
                'BE',
                'BF',
                'BG',
                'BH',
                'BI',
                'BJ',
                'BL',
                'BM',
                'BN',
                'BO',
                'BQ',
                'BR',
                'BS',
                'BT',
                'BV',
                'BW',
                'BY',
                'BZ',
                'CA',
                'CD',
                'CF',
                'CG',
                'CH',
                'CI',
                'CK',
                'CL',
                'CM',
                'CN',
                'CO',
                'CR',
                'CV',
                'CW',
                'CY',
                'CZ',
                'DE',
                'DJ',
                'DK',
                'DM',
                'DO',
                'DZ',
                'EC',
                'EE',
                'EG',
                'EH',
                'ER',
                'ES',
                'ET',
                'FI',
                'FJ',
                'FK',
                'FO',
                'FR',
                'GA',
                'GB',
                'GD',
                'GE',
                'GF',
                'GG',
                'GH',
                'GI',
                'GL',
                'GM',
                'GN',
                'GP',
                'GQ',
                'GR',
                'GS',
                'GT',
                'GU',
                'GW',
                'GY',
                'HK',
                'HN',
                'HR',
                'HT',
                'HU',
                'ID',
                'IE',
                'IL',
                'IM',
                'IN',
                'IO',
                'IQ',
                'IS',
                'IT',
                'JE',
                'JM',
                'JO',
                'JP',
                'KE',
                'KG',
                'KH',
                'KI',
                'KM',
                'KN',
                'KR',
                'KW',
                'KY',
                'KZ',
                'LA',
                'LB',
                'LC',
                'LI',
                'LK',
                'LR',
                'LS',
                'LT',
                'LU',
                'LV',
                'LY',
                'MA',
                'MC',
                'MD',
                'ME',
                'MF',
                'MG',
                'MK',
                'ML',
                'MM',
                'MN',
                'MO',
                'MQ',
                'MR',
                'MS',
                'MT',
                'MU',
                'MV',
                'MW',
                'MX',
                'MY',
                'MZ',
                'NA',
                'NC',
                'NE',
                'NG',
                'NI',
                'NL',
                'NO',
                'NP',
                'NR',
                'NU',
                'NZ',
                'OM',
                'PA',
                'PE',
                'PF',
                'PG',
                'PH',
                'PK',
                'PL',
                'PM',
                'PN',
                'PR',
                'PS',
                'PT',
                'PY',
                'QA',
                'RE',
                'RO',
                'RS',
                'RU',
                'RW',
                'SA',
                'SB',
                'SC',
                'SE',
                'SG',
                'SH',
                'SI',
                'SJ',
                'SK',
                'SL',
                'SM',
                'SN',
                'SO',
                'SR',
                'SS',
                'ST',
                'SV',
                'SX',
                'SZ',
                'TA',
                'TC',
                'TD',
                'TF',
                'TG',
                'TH',
                'TJ',
                'TK',
                'TL',
                'TM',
                'TN',
                'TO',
                'TR',
                'TT',
                'TV',
                'TW',
                'TZ',
                'UA',
                'UG',
                'US',
                'UY',
                'UZ',
                'VA',
                'VC',
                'VE',
                'VG',
                'VN',
                'VU',
                'WF',
                'WS',
                'XK',
                'YE',
                'YT',
                'ZA',
                'ZM',
                'ZW',
                'ZZ',
              ])
            ),
          })
          .optional(),
        shipping_options: z
          .array(
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
            })
          )
          .optional(),
        submit_type: z.enum(['auto', 'book', 'donate', 'pay']).optional(),
        subscription_data: z
          .object({
            application_fee_percent: z.number().safe().finite().optional(),
            billing_cycle_anchor: z.number().int().safe().finite().optional(),
            default_tax_rates: z.array(z.string()).optional(),
            description: z.string().optional(),
            invoice_settings: z
              .object({
                issuer: z
                  .object({
                    account: z.string().optional(),
                    type: z.enum(['account', 'self']),
                  })
                  .optional(),
              })
              .optional(),
            metadata: z.record(z.string()).optional(),
            on_behalf_of: z.string().optional(),
            proration_behavior: z
              .enum(['create_prorations', 'none'])
              .optional(),
            transfer_data: z
              .object({
                amount_percent: z.number().safe().finite().optional(),
                destination: z.string(),
              })
              .optional(),
            trial_end: z.number().int().safe().finite().optional(),
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
          })
          .optional(),
        success_url: z.string().optional(),
        tax_id_collection: z
          .object({
            enabled: z.boolean(),
            required: z.enum(['if_supported', 'never']).optional(),
          })
          .optional(),
        ui_mode: z.enum(['embedded', 'hosted']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Checkout_Session,
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
