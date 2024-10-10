import {z_Setup_intent, z_Error, Setup_intent, Error} from './schemas';
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

export const postSetupIntentsIntentEndpointSchema = {
  path: '/v1/setup_intents/{intent}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        attach_to_self: z.boolean().optional(),
        customer: z.string().optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        flow_directions: z.array(z.enum(['inbound', 'outbound'])).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        payment_method: z.string().optional(),
        payment_method_configuration: z.string().optional(),
        payment_method_data: z
          .object({
            acss_debit: z
              .object({
                account_number: z.string(),
                institution_number: z.string(),
                transit_number: z.string(),
              })
              .optional(),
            affirm: z.object({}).optional(),
            afterpay_clearpay: z.object({}).optional(),
            alipay: z.object({}).optional(),
            allow_redisplay: z
              .enum(['always', 'limited', 'unspecified'])
              .optional(),
            amazon_pay: z.object({}).optional(),
            au_becs_debit: z
              .object({
                account_number: z.string(),
                bsb_number: z.string(),
              })
              .optional(),
            bacs_debit: z
              .object({
                account_number: z.string().optional(),
                sort_code: z.string().optional(),
              })
              .optional(),
            bancontact: z.object({}).optional(),
            billing_details: z
              .object({
                address: z
                  .union([
                    z.object({
                      city: z.string().optional(),
                      country: z.string().optional(),
                      line1: z.string().optional(),
                      line2: z.string().optional(),
                      postal_code: z.string().optional(),
                      state: z.string().optional(),
                    }),
                    z.enum(['']),
                  ])
                  .optional(),
                email: z.union([z.string(), z.enum([''])]).optional(),
                name: z.union([z.string(), z.enum([''])]).optional(),
                phone: z.union([z.string(), z.enum([''])]).optional(),
              })
              .optional(),
            blik: z.object({}).optional(),
            boleto: z
              .object({
                tax_id: z.string(),
              })
              .optional(),
            cashapp: z.object({}).optional(),
            customer_balance: z.object({}).optional(),
            eps: z
              .object({
                bank: z
                  .enum([
                    'arzte_und_apotheker_bank',
                    'austrian_anadi_bank_ag',
                    'bank_austria',
                    'bankhaus_carl_spangler',
                    'bankhaus_schelhammer_und_schattera_ag',
                    'bawag_psk_ag',
                    'bks_bank_ag',
                    'brull_kallmus_bank_ag',
                    'btv_vier_lander_bank',
                    'capital_bank_grawe_gruppe_ag',
                    'deutsche_bank_ag',
                    'dolomitenbank',
                    'easybank_ag',
                    'erste_bank_und_sparkassen',
                    'hypo_alpeadriabank_international_ag',
                    'hypo_bank_burgenland_aktiengesellschaft',
                    'hypo_noe_lb_fur_niederosterreich_u_wien',
                    'hypo_oberosterreich_salzburg_steiermark',
                    'hypo_tirol_bank_ag',
                    'hypo_vorarlberg_bank_ag',
                    'marchfelder_bank',
                    'oberbank_ag',
                    'raiffeisen_bankengruppe_osterreich',
                    'schoellerbank_ag',
                    'sparda_bank_wien',
                    'volksbank_gruppe',
                    'volkskreditbank_ag',
                    'vr_bank_braunau',
                  ])
                  .optional(),
              })
              .optional(),
            fpx: z
              .object({
                bank: z.enum([
                  'affin_bank',
                  'agrobank',
                  'alliance_bank',
                  'ambank',
                  'bank_islam',
                  'bank_muamalat',
                  'bank_of_china',
                  'bank_rakyat',
                  'bsn',
                  'cimb',
                  'deutsche_bank',
                  'hong_leong_bank',
                  'hsbc',
                  'kfh',
                  'maybank2e',
                  'maybank2u',
                  'ocbc',
                  'pb_enterprise',
                  'public_bank',
                  'rhb',
                  'standard_chartered',
                  'uob',
                ]),
              })
              .optional(),
            giropay: z.object({}).optional(),
            grabpay: z.object({}).optional(),
            ideal: z
              .object({
                bank: z
                  .enum([
                    'abn_amro',
                    'asn_bank',
                    'bunq',
                    'handelsbanken',
                    'ing',
                    'knab',
                    'moneyou',
                    'n26',
                    'nn',
                    'rabobank',
                    'regiobank',
                    'revolut',
                    'sns_bank',
                    'triodos_bank',
                    'van_lanschot',
                    'yoursafe',
                  ])
                  .optional(),
              })
              .optional(),
            interac_present: z.object({}).optional(),
            klarna: z
              .object({
                dob: z
                  .object({
                    day: z.number().int().safe().finite(),
                    month: z.number().int().safe().finite(),
                    year: z.number().int().safe().finite(),
                  })
                  .optional(),
              })
              .optional(),
            konbini: z.object({}).optional(),
            link: z.object({}).optional(),
            metadata: z.record(z.string()).optional(),
            mobilepay: z.object({}).optional(),
            multibanco: z.object({}).optional(),
            oxxo: z.object({}).optional(),
            p24: z
              .object({
                bank: z
                  .enum([
                    'alior_bank',
                    'bank_millennium',
                    'bank_nowy_bfg_sa',
                    'bank_pekao_sa',
                    'banki_spbdzielcze',
                    'blik',
                    'bnp_paribas',
                    'boz',
                    'citi_handlowy',
                    'credit_agricole',
                    'envelobank',
                    'etransfer_pocztowy24',
                    'getin_bank',
                    'ideabank',
                    'ing',
                    'inteligo',
                    'mbank_mtransfer',
                    'nest_przelew',
                    'noble_pay',
                    'pbac_z_ipko',
                    'plus_bank',
                    'santander_przelew24',
                    'tmobile_usbugi_bankowe',
                    'toyota_bank',
                    'velobank',
                    'volkswagen_bank',
                  ])
                  .optional(),
              })
              .optional(),
            paynow: z.object({}).optional(),
            paypal: z.object({}).optional(),
            pix: z.object({}).optional(),
            promptpay: z.object({}).optional(),
            radar_options: z
              .object({
                session: z.string().optional(),
              })
              .optional(),
            revolut_pay: z.object({}).optional(),
            sepa_debit: z
              .object({
                iban: z.string(),
              })
              .optional(),
            sofort: z
              .object({
                country: z.enum(['AT', 'BE', 'DE', 'ES', 'IT', 'NL']),
              })
              .optional(),
            swish: z.object({}).optional(),
            twint: z.object({}).optional(),
            type: z.enum([
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
            ]),
            us_bank_account: z
              .object({
                account_holder_type: z
                  .enum(['company', 'individual'])
                  .optional(),
                account_number: z.string().optional(),
                account_type: z.enum(['checking', 'savings']).optional(),
                financial_connections_account: z.string().optional(),
                routing_number: z.string().optional(),
              })
              .optional(),
            wechat_pay: z.object({}).optional(),
            zip: z.object({}).optional(),
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
                verification_method: z
                  .enum(['automatic', 'instant', 'microdeposits'])
                  .optional(),
              })
              .optional(),
            amazon_pay: z.object({}).optional(),
            bacs_debit: z
              .object({
                mandate_options: z.object({}).optional(),
              })
              .optional(),
            card: z
              .object({
                mandate_options: z
                  .object({
                    amount: z.number().int().safe().finite(),
                    amount_type: z.enum(['fixed', 'maximum']),
                    currency: z.string(),
                    description: z.string().optional(),
                    end_date: z.number().int().safe().finite().optional(),
                    interval: z.enum([
                      'day',
                      'month',
                      'sporadic',
                      'week',
                      'year',
                    ]),
                    interval_count: z.number().int().safe().finite().optional(),
                    reference: z.string(),
                    start_date: z.number().int().safe().finite(),
                    supported_types: z.array(z.enum(['india'])).optional(),
                  })
                  .optional(),
                network: z
                  .enum([
                    'amex',
                    'cartes_bancaires',
                    'diners',
                    'discover',
                    'eftpos_au',
                    'girocard',
                    'interac',
                    'jcb',
                    'mastercard',
                    'unionpay',
                    'unknown',
                    'visa',
                  ])
                  .optional(),
                request_three_d_secure: z
                  .enum(['any', 'automatic', 'challenge'])
                  .optional(),
                three_d_secure: z
                  .object({
                    ares_trans_status: z
                      .enum(['A', 'C', 'I', 'N', 'R', 'U', 'Y'])
                      .optional(),
                    cryptogram: z.string().optional(),
                    electronic_commerce_indicator: z
                      .enum(['01', '02', '05', '06', '07'])
                      .optional(),
                    network_options: z
                      .object({
                        cartes_bancaires: z
                          .object({
                            cb_avalgo: z.enum(['0', '1', '2', '3', '4', 'A']),
                            cb_exemption: z.string().optional(),
                            cb_score: z
                              .number()
                              .int()
                              .safe()
                              .finite()
                              .optional(),
                          })
                          .optional(),
                      })
                      .optional(),
                    requestor_challenge_indicator: z.string().optional(),
                    transaction_id: z.string().optional(),
                    version: z.enum(['1.0.2', '2.1.0', '2.2.0']).optional(),
                  })
                  .optional(),
              })
              .optional(),
            card_present: z.object({}).optional(),
            link: z.object({}).optional(),
            paypal: z
              .object({
                billing_agreement_id: z.string().optional(),
              })
              .optional(),
            sepa_debit: z
              .object({
                mandate_options: z.object({}).optional(),
              })
              .optional(),
            us_bank_account: z
              .object({
                financial_connections: z
                  .object({
                    filters: z
                      .object({
                        account_subcategories: z
                          .array(z.enum(['checking', 'savings']))
                          .optional(),
                      })
                      .optional(),
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
                    return_url: z.string().optional(),
                  })
                  .optional(),
                mandate_options: z
                  .object({
                    collection_method: z.enum(['', 'paper']).optional(),
                  })
                  .optional(),
                networks: z
                  .object({
                    requested: z
                      .array(z.enum(['ach', 'us_domestic_wire']))
                      .optional(),
                  })
                  .optional(),
                verification_method: z
                  .enum(['automatic', 'instant', 'microdeposits'])
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        payment_method_types: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Setup_intent,
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
