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
import {Setup_intent, Error} from './schemas';

export const postSetupIntentsIntentEndpointSchema = {
  path: '/v1/setup_intents/{intent}',
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

export type PostSetupIntentsIntentRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      attach_to_self?: boolean;
      customer?: string;
      description?: string;
      expand?: string[];
      flow_directions?: ('inbound' | 'outbound')[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      payment_method?: string;
      payment_method_configuration?: string;
      payment_method_data?: {
        acss_debit?: {
          account_number: string;
          institution_number: string;
          transit_number: string;
        };
        affirm?: {};
        afterpay_clearpay?: {};
        alipay?: {};
        allow_redisplay?: 'always' | 'limited' | 'unspecified';
        amazon_pay?: {};
        au_becs_debit?: {
          account_number: string;
          bsb_number: string;
        };
        bacs_debit?: {
          account_number?: string;
          sort_code?: string;
        };
        bancontact?: {};
        billing_details?: {
          address?: (
            | {
                city?: string;
                country?: string;
                line1?: string;
                line2?: string;
                postal_code?: string;
                state?: string;
              }
            | ''
          ) &
            Partial<{
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            }>;
          email?: string | '';
          name?: string | '';
          phone?: string | '';
        };
        blik?: {};
        boleto?: {
          tax_id: string;
        };
        cashapp?: {};
        customer_balance?: {};
        eps?: {
          bank?:
            | 'arzte_und_apotheker_bank'
            | 'austrian_anadi_bank_ag'
            | 'bank_austria'
            | 'bankhaus_carl_spangler'
            | 'bankhaus_schelhammer_und_schattera_ag'
            | 'bawag_psk_ag'
            | 'bks_bank_ag'
            | 'brull_kallmus_bank_ag'
            | 'btv_vier_lander_bank'
            | 'capital_bank_grawe_gruppe_ag'
            | 'deutsche_bank_ag'
            | 'dolomitenbank'
            | 'easybank_ag'
            | 'erste_bank_und_sparkassen'
            | 'hypo_alpeadriabank_international_ag'
            | 'hypo_bank_burgenland_aktiengesellschaft'
            | 'hypo_noe_lb_fur_niederosterreich_u_wien'
            | 'hypo_oberosterreich_salzburg_steiermark'
            | 'hypo_tirol_bank_ag'
            | 'hypo_vorarlberg_bank_ag'
            | 'marchfelder_bank'
            | 'oberbank_ag'
            | 'raiffeisen_bankengruppe_osterreich'
            | 'schoellerbank_ag'
            | 'sparda_bank_wien'
            | 'volksbank_gruppe'
            | 'volkskreditbank_ag'
            | 'vr_bank_braunau';
        };
        fpx?: {
          bank:
            | 'affin_bank'
            | 'agrobank'
            | 'alliance_bank'
            | 'ambank'
            | 'bank_islam'
            | 'bank_muamalat'
            | 'bank_of_china'
            | 'bank_rakyat'
            | 'bsn'
            | 'cimb'
            | 'deutsche_bank'
            | 'hong_leong_bank'
            | 'hsbc'
            | 'kfh'
            | 'maybank2e'
            | 'maybank2u'
            | 'ocbc'
            | 'pb_enterprise'
            | 'public_bank'
            | 'rhb'
            | 'standard_chartered'
            | 'uob';
        };
        giropay?: {};
        grabpay?: {};
        ideal?: {
          bank?:
            | 'abn_amro'
            | 'asn_bank'
            | 'bunq'
            | 'handelsbanken'
            | 'ing'
            | 'knab'
            | 'moneyou'
            | 'n26'
            | 'nn'
            | 'rabobank'
            | 'regiobank'
            | 'revolut'
            | 'sns_bank'
            | 'triodos_bank'
            | 'van_lanschot'
            | 'yoursafe';
        };
        interac_present?: {};
        klarna?: {
          dob?: {
            day: number; // int
            month: number; // int
            year: number; // int
          };
        };
        konbini?: {};
        link?: {};
        metadata?: {
          [key: string]: string;
        };
        mobilepay?: {};
        multibanco?: {};
        oxxo?: {};
        p24?: {
          bank?:
            | 'alior_bank'
            | 'bank_millennium'
            | 'bank_nowy_bfg_sa'
            | 'bank_pekao_sa'
            | 'banki_spbdzielcze'
            | 'blik'
            | 'bnp_paribas'
            | 'boz'
            | 'citi_handlowy'
            | 'credit_agricole'
            | 'envelobank'
            | 'etransfer_pocztowy24'
            | 'getin_bank'
            | 'ideabank'
            | 'ing'
            | 'inteligo'
            | 'mbank_mtransfer'
            | 'nest_przelew'
            | 'noble_pay'
            | 'pbac_z_ipko'
            | 'plus_bank'
            | 'santander_przelew24'
            | 'tmobile_usbugi_bankowe'
            | 'toyota_bank'
            | 'velobank'
            | 'volkswagen_bank';
        };
        paynow?: {};
        paypal?: {};
        pix?: {};
        promptpay?: {};
        radar_options?: {
          session?: string;
        };
        revolut_pay?: {};
        sepa_debit?: {
          iban: string;
        };
        sofort?: {
          country: 'AT' | 'BE' | 'DE' | 'ES' | 'IT' | 'NL';
        };
        swish?: {};
        twint?: {};
        type:
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
          | 'zip';
        us_bank_account?: {
          account_holder_type?: 'company' | 'individual';
          account_number?: string;
          account_type?: 'checking' | 'savings';
          financial_connections_account?: string;
          routing_number?: string;
        };
        wechat_pay?: {};
        zip?: {};
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
          verification_method?: 'automatic' | 'instant' | 'microdeposits';
        };
        amazon_pay?: {};
        bacs_debit?: {
          mandate_options?: {};
        };
        card?: {
          mandate_options?: {
            amount: number; // int
            amount_type: 'fixed' | 'maximum';
            currency: string;
            description?: string;
            end_date?: number; // int
            interval: 'day' | 'month' | 'sporadic' | 'week' | 'year';
            interval_count?: number; // int
            reference: string;
            start_date: number; // int
            supported_types?: 'india'[];
          };
          network?:
            | 'amex'
            | 'cartes_bancaires'
            | 'diners'
            | 'discover'
            | 'eftpos_au'
            | 'girocard'
            | 'interac'
            | 'jcb'
            | 'mastercard'
            | 'unionpay'
            | 'unknown'
            | 'visa';
          request_three_d_secure?: 'any' | 'automatic' | 'challenge';
          three_d_secure?: {
            ares_trans_status?: 'A' | 'C' | 'I' | 'N' | 'R' | 'U' | 'Y';
            cryptogram?: string;
            electronic_commerce_indicator?: '01' | '02' | '05' | '06' | '07';
            network_options?: {
              cartes_bancaires?: {
                cb_avalgo: '0' | '1' | '2' | '3' | '4' | 'A';
                cb_exemption?: string;
                cb_score?: number; // int
              };
            };
            requestor_challenge_indicator?: string;
            transaction_id?: string;
            version?: '1.0.2' | '2.1.0' | '2.2.0';
          };
        };
        card_present?: {};
        link?: {};
        paypal?: {
          billing_agreement_id?: string;
        };
        sepa_debit?: {
          mandate_options?: {};
        };
        us_bank_account?: {
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
            return_url?: string;
          };
          mandate_options?: {
            collection_method?: '' | 'paper';
          };
          networks?: {
            requested?: ('ach' | 'us_domestic_wire')[];
          };
          verification_method?: 'automatic' | 'instant' | 'microdeposits';
        };
      };
      payment_method_types?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostSetupIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSetupIntentsIntentRequestResult = RequestResult<
  PostSetupIntentsIntentRequest,
  PostSetupIntentsIntentResponse
>;

export function postSetupIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSetupIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetupIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(postSetupIntentsIntentEndpointSchema, payload),
    config
  );
}
