import {
  z_Account,
  z_Error,
  Account,
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

export const postAccountsEndpointSchema = {
  path: '/v1/accounts',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account_token: z.string().optional(),
        bank_account: z
          .union([
            z.object({
              account_holder_name: z.string().optional(),
              account_holder_type: z.enum(['company', 'individual']).optional(),
              account_number: z.string(),
              account_type: z
                .enum(['checking', 'futsu', 'savings', 'toza'])
                .optional(),
              country: z.string(),
              currency: z.string().optional(),
              documents: z
                .object({
                  bank_account_ownership_verification: z
                    .object({
                      files: z.array(z.string()).optional(),
                    })
                    .optional(),
                })
                .optional(),
              object: z.enum(['bank_account']).optional(),
              routing_number: z.string().optional(),
            }),
            z.string(),
          ])
          .optional(),
        business_profile: z
          .object({
            annual_revenue: z
              .object({
                amount: z.number().int().safe().finite(),
                currency: z.string(),
                fiscal_year_end: z.string(),
              })
              .optional(),
            estimated_worker_count: z.number().int().safe().finite().optional(),
            mcc: z.string().optional(),
            monthly_estimated_revenue: z
              .object({
                amount: z.number().int().safe().finite(),
                currency: z.string(),
              })
              .optional(),
            name: z.string().optional(),
            product_description: z.string().optional(),
            support_address: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              })
              .optional(),
            support_email: z.string().optional(),
            support_phone: z.string().optional(),
            support_url: z.union([z.string(), z.enum([''])]).optional(),
            url: z.string().optional(),
          })
          .optional(),
        business_type: z
          .enum(['company', 'government_entity', 'individual', 'non_profit'])
          .optional(),
        capabilities: z
          .object({
            acss_debit_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            affirm_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            afterpay_clearpay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            amazon_pay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            au_becs_debit_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            bacs_debit_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            bancontact_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            blik_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            boleto_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            card_issuing: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            card_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            cartes_bancaires_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            cashapp_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            eps_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            fpx_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            gb_bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            giropay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            grabpay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            ideal_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            india_international_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            jcb_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            jp_bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            klarna_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            konbini_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            legacy_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            link_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            mobilepay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            multibanco_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            mx_bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            oxxo_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            p24_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            paynow_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            promptpay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            revolut_pay_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            sepa_bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            sepa_debit_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            sofort_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            swish_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            tax_reporting_us_1099_k: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            tax_reporting_us_1099_misc: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            transfers: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            treasury: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            twint_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            us_bank_account_ach_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            us_bank_transfer_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
            zip_payments: z
              .object({
                requested: z.boolean().optional(),
              })
              .optional(),
          })
          .optional(),
        company: z
          .object({
            address: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              })
              .optional(),
            address_kana: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
                town: z.string().optional(),
              })
              .optional(),
            address_kanji: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
                town: z.string().optional(),
              })
              .optional(),
            directors_provided: z.boolean().optional(),
            executives_provided: z.boolean().optional(),
            export_license_id: z.string().optional(),
            export_purpose_code: z.string().optional(),
            name: z.string().optional(),
            name_kana: z.string().optional(),
            name_kanji: z.string().optional(),
            owners_provided: z.boolean().optional(),
            ownership_declaration: z
              .object({
                date: z.number().int().safe().finite().optional(),
                ip: z.string().optional(),
                user_agent: z.string().optional(),
              })
              .optional(),
            phone: z.string().optional(),
            registration_number: z.string().optional(),
            structure: z
              .enum([
                '',
                'free_zone_establishment',
                'free_zone_llc',
                'government_instrumentality',
                'governmental_unit',
                'incorporated_non_profit',
                'incorporated_partnership',
                'limited_liability_partnership',
                'llc',
                'multi_member_llc',
                'private_company',
                'private_corporation',
                'private_partnership',
                'public_company',
                'public_corporation',
                'public_partnership',
                'registered_charity',
                'single_member_llc',
                'sole_establishment',
                'sole_proprietorship',
                'tax_exempt_government_instrumentality',
                'unincorporated_association',
                'unincorporated_non_profit',
                'unincorporated_partnership',
              ])
              .optional(),
            tax_id: z.string().optional(),
            tax_id_registrar: z.string().optional(),
            vat_id: z.string().optional(),
            verification: z
              .object({
                document: z
                  .object({
                    back: z.string().optional(),
                    front: z.string().optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        controller: z
          .object({
            fees: z
              .object({
                payer: z.enum(['account', 'application']).optional(),
              })
              .optional(),
            losses: z
              .object({
                payments: z.enum(['application', 'stripe']).optional(),
              })
              .optional(),
            requirement_collection: z
              .enum(['application', 'stripe'])
              .optional(),
            stripe_dashboard: z
              .object({
                type: z.enum(['express', 'full', 'none']).optional(),
              })
              .optional(),
          })
          .optional(),
        country: z.string().optional(),
        default_currency: z.string().optional(),
        documents: z
          .object({
            bank_account_ownership_verification: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            company_license: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            company_memorandum_of_association: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            company_ministerial_decree: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            company_registration_verification: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            company_tax_id_verification: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
            proof_of_registration: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
          })
          .optional(),
        email: z.string().optional(),
        expand: z.array(z.string()).optional(),
        external_account: z.string().optional(),
        individual: z
          .object({
            address: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              })
              .optional(),
            address_kana: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
                town: z.string().optional(),
              })
              .optional(),
            address_kanji: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
                town: z.string().optional(),
              })
              .optional(),
            dob: z
              .union([
                z.object({
                  day: z.number().int().safe().finite(),
                  month: z.number().int().safe().finite(),
                  year: z.number().int().safe().finite(),
                }),
                z.enum(['']),
              ])
              .optional(),
            email: z.string().optional(),
            first_name: z.string().optional(),
            first_name_kana: z.string().optional(),
            first_name_kanji: z.string().optional(),
            full_name_aliases: z
              .union([z.array(z.string()), z.enum([''])])
              .optional(),
            gender: z.string().optional(),
            id_number: z.string().optional(),
            id_number_secondary: z.string().optional(),
            last_name: z.string().optional(),
            last_name_kana: z.string().optional(),
            last_name_kanji: z.string().optional(),
            maiden_name: z.string().optional(),
            metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
            phone: z.string().optional(),
            political_exposure: z.enum(['existing', 'none']).optional(),
            registered_address: z
              .object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              })
              .optional(),
            relationship: z
              .object({
                director: z.boolean().optional(),
                executive: z.boolean().optional(),
                owner: z.boolean().optional(),
                percent_ownership: z
                  .union([z.number().safe().finite(), z.enum([''])])
                  .optional(),
                title: z.string().optional(),
              })
              .optional(),
            ssn_last_4: z.string().optional(),
            verification: z
              .object({
                additional_document: z
                  .object({
                    back: z.string().optional(),
                    front: z.string().optional(),
                  })
                  .optional(),
                document: z
                  .object({
                    back: z.string().optional(),
                    front: z.string().optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        settings: z
          .object({
            bacs_debit_payments: z
              .object({
                display_name: z.string().optional(),
              })
              .optional(),
            branding: z
              .object({
                icon: z.string().optional(),
                logo: z.string().optional(),
                primary_color: z.string().optional(),
                secondary_color: z.string().optional(),
              })
              .optional(),
            card_issuing: z
              .object({
                tos_acceptance: z
                  .object({
                    date: z.number().int().safe().finite().optional(),
                    ip: z.string().optional(),
                    user_agent: z.union([z.string(), z.enum([''])]).optional(),
                  })
                  .optional(),
              })
              .optional(),
            card_payments: z
              .object({
                decline_on: z
                  .object({
                    avs_failure: z.boolean().optional(),
                    cvc_failure: z.boolean().optional(),
                  })
                  .optional(),
                statement_descriptor_prefix: z.string().optional(),
                statement_descriptor_prefix_kana: z
                  .union([z.string(), z.enum([''])])
                  .optional(),
                statement_descriptor_prefix_kanji: z
                  .union([z.string(), z.enum([''])])
                  .optional(),
              })
              .optional(),
            payments: z
              .object({
                statement_descriptor: z.string().optional(),
                statement_descriptor_kana: z.string().optional(),
                statement_descriptor_kanji: z.string().optional(),
              })
              .optional(),
            payouts: z
              .object({
                debit_negative_balances: z.boolean().optional(),
                schedule: z
                  .object({
                    delay_days: z
                      .union([
                        z.enum(['minimum']),
                        z.number().int().safe().finite(),
                      ])
                      .optional(),
                    interval: z
                      .enum(['daily', 'manual', 'monthly', 'weekly'])
                      .optional(),
                    monthly_anchor: z.number().int().safe().finite().optional(),
                    weekly_anchor: z
                      .enum([
                        'friday',
                        'monday',
                        'saturday',
                        'sunday',
                        'thursday',
                        'tuesday',
                        'wednesday',
                      ])
                      .optional(),
                  })
                  .optional(),
                statement_descriptor: z.string().optional(),
              })
              .optional(),
            treasury: z
              .object({
                tos_acceptance: z
                  .object({
                    date: z.number().int().safe().finite().optional(),
                    ip: z.string().optional(),
                    user_agent: z.union([z.string(), z.enum([''])]).optional(),
                  })
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        tos_acceptance: z
          .object({
            date: z.number().int().safe().finite().optional(),
            ip: z.string().optional(),
            service_agreement: z.string().optional(),
            user_agent: z.string().optional(),
          })
          .optional(),
        type: z.enum(['custom', 'express', 'standard']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Account,
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
