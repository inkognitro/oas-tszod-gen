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
import {Account, Error} from '@example-outputs/stripe';

export const postAccountsEndpointSchema = {
  path: '/v1/accounts',
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

export type PostAccountsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_token?: string;
      bank_account?: (
        | {
            account_holder_name?: string;
            account_holder_type?: 'company' | 'individual';
            account_number: string;
            account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
            country: string;
            currency?: string;
            documents?: {
              bank_account_ownership_verification?: {
                files?: string[];
              };
            };
            object?: 'bank_account';
            routing_number?: string;
          }
        | string
      ) &
        Partial<{
          account_holder_name?: string;
          account_holder_type?: 'company' | 'individual';
          account_number: string;
          account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
          country: string;
          currency?: string;
          documents?: {
            bank_account_ownership_verification?: {
              files?: string[];
            };
          };
          object?: 'bank_account';
          routing_number?: string;
        }>;
      business_profile?: {
        annual_revenue?: {
          amount: number; // int
          currency: string;
          fiscal_year_end: string;
        };
        estimated_worker_count?: number; // int
        mcc?: string;
        monthly_estimated_revenue?: {
          amount: number; // int
          currency: string;
        };
        name?: string;
        product_description?: string;
        support_address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        support_email?: string;
        support_phone?: string;
        support_url?: string | '';
        url?: string;
      };
      business_type?:
        | 'company'
        | 'government_entity'
        | 'individual'
        | 'non_profit';
      capabilities?: {
        acss_debit_payments?: {
          requested?: boolean;
        };
        affirm_payments?: {
          requested?: boolean;
        };
        afterpay_clearpay_payments?: {
          requested?: boolean;
        };
        amazon_pay_payments?: {
          requested?: boolean;
        };
        au_becs_debit_payments?: {
          requested?: boolean;
        };
        bacs_debit_payments?: {
          requested?: boolean;
        };
        bancontact_payments?: {
          requested?: boolean;
        };
        bank_transfer_payments?: {
          requested?: boolean;
        };
        blik_payments?: {
          requested?: boolean;
        };
        boleto_payments?: {
          requested?: boolean;
        };
        card_issuing?: {
          requested?: boolean;
        };
        card_payments?: {
          requested?: boolean;
        };
        cartes_bancaires_payments?: {
          requested?: boolean;
        };
        cashapp_payments?: {
          requested?: boolean;
        };
        eps_payments?: {
          requested?: boolean;
        };
        fpx_payments?: {
          requested?: boolean;
        };
        gb_bank_transfer_payments?: {
          requested?: boolean;
        };
        giropay_payments?: {
          requested?: boolean;
        };
        grabpay_payments?: {
          requested?: boolean;
        };
        ideal_payments?: {
          requested?: boolean;
        };
        india_international_payments?: {
          requested?: boolean;
        };
        jcb_payments?: {
          requested?: boolean;
        };
        jp_bank_transfer_payments?: {
          requested?: boolean;
        };
        klarna_payments?: {
          requested?: boolean;
        };
        konbini_payments?: {
          requested?: boolean;
        };
        legacy_payments?: {
          requested?: boolean;
        };
        link_payments?: {
          requested?: boolean;
        };
        mobilepay_payments?: {
          requested?: boolean;
        };
        multibanco_payments?: {
          requested?: boolean;
        };
        mx_bank_transfer_payments?: {
          requested?: boolean;
        };
        oxxo_payments?: {
          requested?: boolean;
        };
        p24_payments?: {
          requested?: boolean;
        };
        paynow_payments?: {
          requested?: boolean;
        };
        promptpay_payments?: {
          requested?: boolean;
        };
        revolut_pay_payments?: {
          requested?: boolean;
        };
        sepa_bank_transfer_payments?: {
          requested?: boolean;
        };
        sepa_debit_payments?: {
          requested?: boolean;
        };
        sofort_payments?: {
          requested?: boolean;
        };
        swish_payments?: {
          requested?: boolean;
        };
        tax_reporting_us_1099_k?: {
          requested?: boolean;
        };
        tax_reporting_us_1099_misc?: {
          requested?: boolean;
        };
        transfers?: {
          requested?: boolean;
        };
        treasury?: {
          requested?: boolean;
        };
        twint_payments?: {
          requested?: boolean;
        };
        us_bank_account_ach_payments?: {
          requested?: boolean;
        };
        us_bank_transfer_payments?: {
          requested?: boolean;
        };
        zip_payments?: {
          requested?: boolean;
        };
      };
      company?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        address_kana?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
          town?: string;
        };
        address_kanji?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
          town?: string;
        };
        directors_provided?: boolean;
        executives_provided?: boolean;
        export_license_id?: string;
        export_purpose_code?: string;
        name?: string;
        name_kana?: string;
        name_kanji?: string;
        owners_provided?: boolean;
        ownership_declaration?: {
          date?: number; // int
          ip?: string;
          user_agent?: string;
        };
        phone?: string;
        registration_number?: string;
        structure?:
          | ''
          | 'free_zone_establishment'
          | 'free_zone_llc'
          | 'government_instrumentality'
          | 'governmental_unit'
          | 'incorporated_non_profit'
          | 'incorporated_partnership'
          | 'limited_liability_partnership'
          | 'llc'
          | 'multi_member_llc'
          | 'private_company'
          | 'private_corporation'
          | 'private_partnership'
          | 'public_company'
          | 'public_corporation'
          | 'public_partnership'
          | 'registered_charity'
          | 'single_member_llc'
          | 'sole_establishment'
          | 'sole_proprietorship'
          | 'tax_exempt_government_instrumentality'
          | 'unincorporated_association'
          | 'unincorporated_non_profit'
          | 'unincorporated_partnership';
        tax_id?: string;
        tax_id_registrar?: string;
        vat_id?: string;
        verification?: {
          document?: {
            back?: string;
            front?: string;
          };
        };
      };
      controller?: {
        fees?: {
          payer?: 'account' | 'application';
        };
        losses?: {
          payments?: 'application' | 'stripe';
        };
        requirement_collection?: 'application' | 'stripe';
        stripe_dashboard?: {
          type?: 'express' | 'full' | 'none';
        };
      };
      country?: string;
      default_currency?: string;
      documents?: {
        bank_account_ownership_verification?: {
          files?: string[];
        };
        company_license?: {
          files?: string[];
        };
        company_memorandum_of_association?: {
          files?: string[];
        };
        company_ministerial_decree?: {
          files?: string[];
        };
        company_registration_verification?: {
          files?: string[];
        };
        company_tax_id_verification?: {
          files?: string[];
        };
        proof_of_registration?: {
          files?: string[];
        };
      };
      email?: string;
      expand?: string[];
      external_account?: string;
      individual?: {
        address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        address_kana?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
          town?: string;
        };
        address_kanji?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
          town?: string;
        };
        dob?: (
          | {
              day: number; // int
              month: number; // int
              year: number; // int
            }
          | ''
        ) &
          Partial<{
            day: number; // int
            month: number; // int
            year: number; // int
          }>;
        email?: string;
        first_name?: string;
        first_name_kana?: string;
        first_name_kanji?: string;
        full_name_aliases?: string[] | '';
        gender?: string;
        id_number?: string;
        id_number_secondary?: string;
        last_name?: string;
        last_name_kana?: string;
        last_name_kanji?: string;
        maiden_name?: string;
        metadata?:
          | {
              [key: string]: string;
            }
          | '';
        phone?: string;
        political_exposure?: 'existing' | 'none';
        registered_address?: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        relationship?: {
          director?: boolean;
          executive?: boolean;
          owner?: boolean;
          percent_ownership?: number | '';
          title?: string;
        };
        ssn_last_4?: string;
        verification?: {
          additional_document?: {
            back?: string;
            front?: string;
          };
          document?: {
            back?: string;
            front?: string;
          };
        };
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      settings?: {
        bacs_debit_payments?: {
          display_name?: string;
        };
        branding?: {
          icon?: string;
          logo?: string;
          primary_color?: string;
          secondary_color?: string;
        };
        card_issuing?: {
          tos_acceptance?: {
            date?: number; // int
            ip?: string;
            user_agent?: string | '';
          };
        };
        card_payments?: {
          decline_on?: {
            avs_failure?: boolean;
            cvc_failure?: boolean;
          };
          statement_descriptor_prefix?: string;
          statement_descriptor_prefix_kana?: string | '';
          statement_descriptor_prefix_kanji?: string | '';
        };
        payments?: {
          statement_descriptor?: string;
          statement_descriptor_kana?: string;
          statement_descriptor_kanji?: string;
        };
        payouts?: {
          debit_negative_balances?: boolean;
          schedule?: {
            delay_days?: 'minimum' | number;
            interval?: 'daily' | 'manual' | 'monthly' | 'weekly';
            monthly_anchor?: number; // int
            weekly_anchor?:
              | 'friday'
              | 'monday'
              | 'saturday'
              | 'sunday'
              | 'thursday'
              | 'tuesday'
              | 'wednesday';
          };
          statement_descriptor?: string;
        };
        treasury?: {
          tos_acceptance?: {
            date?: number; // int
            ip?: string;
            user_agent?: string | '';
          };
        };
      };
      tos_acceptance?: {
        date?: number; // int
        ip?: string;
        service_agreement?: string;
        user_agent?: string;
      };
      type?: 'custom' | 'express' | 'standard';
    }
  >
>;

export type PostAccountsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsRequestResult = RequestResult<
  PostAccountsRequest,
  PostAccountsResponse
>;

export function postAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostAccountsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsEndpointSchema, payload),
    config
  );
}
