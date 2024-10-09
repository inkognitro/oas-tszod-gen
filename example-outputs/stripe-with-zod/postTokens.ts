import {z_Token, z_Error, Token, Error} from '@example-outputs/stripe-with-zod';
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

export const postTokensEndpointSchema = {
  path: '/v1/tokens',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account: z
          .object({
            business_type: z
              .enum([
                'company',
                'government_entity',
                'individual',
                'non_profit',
              ])
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
                ownership_declaration_shown_and_signed: z.boolean().optional(),
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
                metadata: z
                  .union([z.record(z.string()), z.enum([''])])
                  .optional(),
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
            tos_shown_and_accepted: z.boolean().optional(),
          })
          .optional(),
        bank_account: z
          .object({
            account_holder_name: z.string().optional(),
            account_holder_type: z.enum(['company', 'individual']).optional(),
            account_number: z.string(),
            account_type: z
              .enum(['checking', 'futsu', 'savings', 'toza'])
              .optional(),
            country: z.string(),
            currency: z.string().optional(),
            payment_method: z.string().optional(),
            routing_number: z.string().optional(),
          })
          .optional(),
        card: z
          .union([
            z.object({
              address_city: z.string().optional(),
              address_country: z.string().optional(),
              address_line1: z.string().optional(),
              address_line2: z.string().optional(),
              address_state: z.string().optional(),
              address_zip: z.string().optional(),
              currency: z.string().optional(),
              cvc: z.string().optional(),
              exp_month: z.string(),
              exp_year: z.string(),
              name: z.string().optional(),
              networks: z
                .object({
                  preferred: z
                    .enum(['cartes_bancaires', 'mastercard', 'visa'])
                    .optional(),
                })
                .optional(),
              number: z.string(),
            }),
            z.string(),
          ])
          .optional(),
        customer: z.string().optional(),
        cvc_update: z
          .object({
            cvc: z.string(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        person: z
          .object({
            additional_tos_acceptances: z
              .object({
                account: z
                  .object({
                    date: z.number().int().safe().finite().optional(),
                    ip: z.string().optional(),
                    user_agent: z.union([z.string(), z.enum([''])]).optional(),
                  })
                  .optional(),
              })
              .optional(),
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
            documents: z
              .object({
                company_authorization: z
                  .object({
                    files: z
                      .array(z.union([z.string(), z.enum([''])]))
                      .optional(),
                  })
                  .optional(),
                passport: z
                  .object({
                    files: z
                      .array(z.union([z.string(), z.enum([''])]))
                      .optional(),
                  })
                  .optional(),
                visa: z
                  .object({
                    files: z
                      .array(z.union([z.string(), z.enum([''])]))
                      .optional(),
                  })
                  .optional(),
              })
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
            nationality: z.string().optional(),
            phone: z.string().optional(),
            political_exposure: z.string().optional(),
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
                legal_guardian: z.boolean().optional(),
                owner: z.boolean().optional(),
                percent_ownership: z
                  .union([z.number().safe().finite(), z.enum([''])])
                  .optional(),
                representative: z.boolean().optional(),
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
        pii: z
          .object({
            id_number: z.string().optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Token,
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

export type PostTokensRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account?: {
        business_type?:
          | 'company'
          | 'government_entity'
          | 'individual'
          | 'non_profit';
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
          ownership_declaration_shown_and_signed?: boolean;
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
        tos_shown_and_accepted?: boolean;
      };
      bank_account?: {
        account_holder_name?: string;
        account_holder_type?: 'company' | 'individual';
        account_number: string;
        account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
        country: string;
        currency?: string;
        payment_method?: string;
        routing_number?: string;
      };
      card?: (
        | {
            address_city?: string;
            address_country?: string;
            address_line1?: string;
            address_line2?: string;
            address_state?: string;
            address_zip?: string;
            currency?: string;
            cvc?: string;
            exp_month: string;
            exp_year: string;
            name?: string;
            networks?: {
              preferred?: 'cartes_bancaires' | 'mastercard' | 'visa';
            };
            number: string;
          }
        | string
      ) &
        Partial<{
          address_city?: string;
          address_country?: string;
          address_line1?: string;
          address_line2?: string;
          address_state?: string;
          address_zip?: string;
          currency?: string;
          cvc?: string;
          exp_month: string;
          exp_year: string;
          name?: string;
          networks?: {
            preferred?: 'cartes_bancaires' | 'mastercard' | 'visa';
          };
          number: string;
        }>;
      customer?: string;
      cvc_update?: {
        cvc: string;
      };
      expand?: string[];
      person?: {
        additional_tos_acceptances?: {
          account?: {
            date?: number; // int
            ip?: string;
            user_agent?: string | '';
          };
        };
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
        documents?: {
          company_authorization?: {
            files?: (string | '')[];
          };
          passport?: {
            files?: (string | '')[];
          };
          visa?: {
            files?: (string | '')[];
          };
        };
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
        nationality?: string;
        phone?: string;
        political_exposure?: string;
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
          legal_guardian?: boolean;
          owner?: boolean;
          percent_ownership?: number | '';
          representative?: boolean;
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
      pii?: {
        id_number?: string;
      };
    }
  >
>;

export type PostTokensResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Token>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTokensRequestResult = RequestResult<
  PostTokensRequest,
  PostTokensResponse
>;

export function postTokens(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostTokensRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostTokensRequestResult> {
  return requestHandler.execute(
    createRequest(postTokensEndpointSchema, payload),
    config
  );
}
