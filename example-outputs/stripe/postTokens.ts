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
import {Token, Error} from '@example-outputs/stripe';

export const postTokensEndpointSchema = {
  path: '/v1/tokens',
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
