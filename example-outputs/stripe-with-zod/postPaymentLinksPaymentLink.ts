import {
  z_Payment_link,
  z_Error,
  Payment_link,
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

export const postPaymentLinksPaymentLinkEndpointSchema = {
  path: '/v1/payment_links/{payment_link}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payment_link: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
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
        custom_fields: z
          .union([
            z.array(
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
            ),
            z.enum(['']),
          ])
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
        inactive_message: z.union([z.string(), z.enum([''])]).optional(),
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
              id: z.string(),
              quantity: z.number().int().safe().finite().optional(),
            })
          )
          .optional(),
        metadata: z.record(z.string()).optional(),
        payment_intent_data: z
          .object({
            description: z.union([z.string(), z.enum([''])]).optional(),
            metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
            statement_descriptor: z
              .union([z.string(), z.enum([''])])
              .optional(),
            statement_descriptor_suffix: z
              .union([z.string(), z.enum([''])])
              .optional(),
            transfer_group: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        payment_method_collection: z.enum(['always', 'if_required']).optional(),
        payment_method_types: z
          .union([
            z.array(
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
            ),
            z.enum(['']),
          ])
          .optional(),
        restrictions: z
          .union([
            z.object({
              completed_sessions: z.object({
                limit: z.number().int().safe().finite(),
              }),
            }),
            z.enum(['']),
          ])
          .optional(),
        shipping_address_collection: z
          .union([
            z.object({
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
            }),
            z.enum(['']),
          ])
          .optional(),
        subscription_data: z
          .object({
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
            metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
            trial_settings: z
              .union([
                z.object({
                  end_behavior: z.object({
                    missing_payment_method: z.enum([
                      'cancel',
                      'create_invoice',
                      'pause',
                    ]),
                  }),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        tax_id_collection: z
          .object({
            enabled: z.boolean(),
            required: z.enum(['if_supported', 'never']).optional(),
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

export type PostPaymentLinksPaymentLinkRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
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
      automatic_tax?: {
        enabled: boolean;
        liability?: {
          account?: string;
          type: 'account' | 'self';
        };
      };
      billing_address_collection?: 'auto' | 'required';
      custom_fields?:
        | {
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
          }[]
        | '';
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
      inactive_message?: string | '';
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
      line_items?: {
        adjustable_quantity?: {
          enabled: boolean;
          maximum?: number; // int
          minimum?: number; // int
        };
        id: string;
        quantity?: number; // int
      }[];
      metadata?: {
        [key: string]: string;
      };
      payment_intent_data?: {
        description?: string | '';
        metadata?:
          | {
              [key: string]: string;
            }
          | '';
        statement_descriptor?: string | '';
        statement_descriptor_suffix?: string | '';
        transfer_group?: string | '';
      };
      payment_method_collection?: 'always' | 'if_required';
      payment_method_types?:
        | (
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
          )[]
        | '';
      restrictions?: (
        | {
            completed_sessions: {
              limit: number; // int
            };
          }
        | ''
      ) &
        Partial<{
          completed_sessions: {
            limit: number; // int
          };
        }>;
      shipping_address_collection?: (
        | {
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
          }
        | ''
      ) &
        Partial<{
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
        }>;
      subscription_data?: {
        invoice_settings?: {
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        metadata?:
          | {
              [key: string]: string;
            }
          | '';
        trial_settings?: (
          | {
              end_behavior: {
                missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
              };
            }
          | ''
        ) &
          Partial<{
            end_behavior: {
              missing_payment_method: 'cancel' | 'create_invoice' | 'pause';
            };
          }>;
      };
      tax_id_collection?: {
        enabled: boolean;
        required?: 'if_supported' | 'never';
      };
    }
  >,
  {
    payment_link: string;
  }
>;

export type PostPaymentLinksPaymentLinkResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_link>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentLinksPaymentLinkRequestResult = RequestResult<
  PostPaymentLinksPaymentLinkRequest,
  PostPaymentLinksPaymentLinkResponse
>;

export function postPaymentLinksPaymentLink(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentLinksPaymentLinkRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentLinksPaymentLinkRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentLinksPaymentLinkEndpointSchema, payload),
    config
  );
}
