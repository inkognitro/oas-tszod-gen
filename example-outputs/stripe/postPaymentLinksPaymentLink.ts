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
import {Payment_link, Error} from '@example-outputs/stripe';

export const postPaymentLinksPaymentLinkEndpointSchema = {
  path: '/v1/payment_links/{payment_link}',
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
