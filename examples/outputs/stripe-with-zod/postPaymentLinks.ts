import {z_Payment_link, z_Error, Payment_link, Error} from './schemas';
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

export const postPaymentLinksEndpointSchema = {
  path: '/v1/payment_links',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        after_completion: z
          .object({
            hosted_confirmation: z
              .object({
                custom_message: z.string().optional(),
              })
              .optional(),
            redirect: z
              .object({
                url: z.string(),
              })
              .optional(),
            type: z.enum(['hosted_confirmation', 'redirect']),
          })
          .optional(),
        allow_promotion_codes: z.boolean().optional(),
        application_fee_amount: z.number().int().safe().finite().optional(),
        application_fee_percent: z.number().safe().finite().optional(),
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
                  maximum_length: z.number().int().safe().finite().optional(),
                  minimum_length: z.number().int().safe().finite().optional(),
                })
                .optional(),
              optional: z.boolean().optional(),
              text: z
                .object({
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
        customer_creation: z.enum(['always', 'if_required']).optional(),
        expand: z.array(z.string()).optional(),
        inactive_message: z.string().optional(),
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
                metadata: z
                  .union([z.record(z.string()), z.enum([''])])
                  .optional(),
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
        line_items: z.array(
          z.object({
            adjustable_quantity: z
              .object({
                enabled: z.boolean(),
                maximum: z.number().int().safe().finite().optional(),
                minimum: z.number().int().safe().finite().optional(),
              })
              .optional(),
            price: z.string(),
            quantity: z.number().int().safe().finite(),
          })
        ),
        metadata: z.record(z.string()).optional(),
        on_behalf_of: z.string().optional(),
        payment_intent_data: z
          .object({
            capture_method: z
              .enum(['automatic', 'automatic_async', 'manual'])
              .optional(),
            description: z.string().optional(),
            metadata: z.record(z.string()).optional(),
            setup_future_usage: z
              .enum(['off_session', 'on_session'])
              .optional(),
            statement_descriptor: z.string().optional(),
            statement_descriptor_suffix: z.string().optional(),
            transfer_group: z.string().optional(),
          })
          .optional(),
        payment_method_collection: z.enum(['always', 'if_required']).optional(),
        payment_method_types: z
          .array(
            z.enum([
              'affirm',
              'afterpay_clearpay',
              'alipay',
              'au_becs_debit',
              'bacs_debit',
              'bancontact',
              'blik',
              'boleto',
              'card',
              'cashapp',
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
        restrictions: z
          .object({
            completed_sessions: z.object({
              limit: z.number().int().safe().finite(),
            }),
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
            })
          )
          .optional(),
        submit_type: z.enum(['auto', 'book', 'donate', 'pay']).optional(),
        subscription_data: z
          .object({
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
        tax_id_collection: z
          .object({
            enabled: z.boolean(),
            required: z.enum(['if_supported', 'never']).optional(),
          })
          .optional(),
        transfer_data: z
          .object({
            amount: z.number().int().safe().finite().optional(),
            destination: z.string(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_link,
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

export type PostPaymentLinksRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      after_completion?: {
        hosted_confirmation?: {
          custom_message?: string;
        };
        redirect?: {
          url: string;
        };
        type: 'hosted_confirmation' | 'redirect';
      };
      allow_promotion_codes?: boolean;
      application_fee_amount?: number; // int
      application_fee_percent?: number;
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      billing_address_collection?: 'auto' | 'required';
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
          maximum_length?: number; // int
          minimum_length?: number; // int
        };
        optional?: boolean;
        text?: {
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
      customer_creation?: 'always' | 'if_required';
      expand?: string[];
      inactive_message?: string;
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
          metadata?:
            | {
                [key: string]: string;
              }
            | '';
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
      line_items: {
        adjustable_quantity?: {
          enabled: boolean;
          maximum?: number; // int
          minimum?: number; // int
        };
        price: string;
        quantity: number; // int
      }[];
      metadata?: {
        [key: string]: string;
      };
      on_behalf_of?: string;
      payment_intent_data?: {
        capture_method?: 'automatic' | 'automatic_async' | 'manual';
        description?: string;
        metadata?: {
          [key: string]: string;
        };
        setup_future_usage?: 'off_session' | 'on_session';
        statement_descriptor?: string;
        statement_descriptor_suffix?: string;
        transfer_group?: string;
      };
      payment_method_collection?: 'always' | 'if_required';
      payment_method_types?: (
        | 'affirm'
        | 'afterpay_clearpay'
        | 'alipay'
        | 'au_becs_debit'
        | 'bacs_debit'
        | 'bancontact'
        | 'blik'
        | 'boleto'
        | 'card'
        | 'cashapp'
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
      restrictions?: {
        completed_sessions: {
          limit: number; // int
        };
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
      }[];
      submit_type?: 'auto' | 'book' | 'donate' | 'pay';
      subscription_data?: {
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
        trial_period_days?: number; // int
        trial_settings?: {
          end_behavior: {
            missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
          };
        };
      };
      tax_id_collection?: {
        enabled: boolean;
        required?: 'if_supported' | 'never';
      };
      transfer_data?: {
        amount?: number; // int
        destination: string;
      };
    }
  >
>;

export type PostPaymentLinksResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentLinksRequestResult = RequestResult<
  PostPaymentLinksRequest,
  PostPaymentLinksResponse
>;

export function postPaymentLinks(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentLinksRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentLinksRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentLinksEndpointSchema, payload),
    config
  );
}
