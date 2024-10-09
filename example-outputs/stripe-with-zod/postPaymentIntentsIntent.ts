import {
  z_Payment_intent,
  z_Error,
  Payment_intent,
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

export const postPaymentIntentsIntentEndpointSchema = {
  path: '/v1/payment_intents/{intent}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        application_fee_amount: z
          .union([z.number().int().safe().finite(), z.enum([''])])
          .optional(),
        capture_method: z
          .enum(['automatic', 'automatic_async', 'manual'])
          .optional(),
        currency: z.string().optional(),
        customer: z.string().optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
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
              .union([
                z.object({
                  mandate_options: z
                    .object({
                      custom_mandate_url: z
                        .union([z.string(), z.enum([''])])
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
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                  verification_method: z
                    .enum(['automatic', 'instant', 'microdeposits'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            affirm: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  preferred_locale: z.string().optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            afterpay_clearpay: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  reference: z.string().optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            alipay: z
              .union([
                z.object({
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            amazon_pay: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            au_becs_debit: z
              .union([
                z.object({
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            bacs_debit: z
              .union([
                z.object({
                  mandate_options: z.object({}).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            bancontact: z
              .union([
                z.object({
                  preferred_language: z
                    .enum(['de', 'en', 'fr', 'nl'])
                    .optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            blik: z
              .union([
                z.object({
                  code: z.string().optional(),
                  setup_future_usage: z.enum(['', 'none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            boleto: z
              .union([
                z.object({
                  expires_after_days: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            card: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  cvc_token: z.string().optional(),
                  installments: z
                    .object({
                      enabled: z.boolean().optional(),
                      plan: z
                        .union([
                          z.object({
                            count: z.number().int().safe().finite().optional(),
                            interval: z.enum(['month']).optional(),
                            type: z.enum(['fixed_count']),
                          }),
                          z.enum(['']),
                        ])
                        .optional(),
                    })
                    .optional(),
                  mandate_options: z
                    .object({
                      amount: z.number().int().safe().finite(),
                      amount_type: z.enum(['fixed', 'maximum']),
                      description: z.string().optional(),
                      end_date: z.number().int().safe().finite().optional(),
                      interval: z.enum([
                        'day',
                        'month',
                        'sporadic',
                        'week',
                        'year',
                      ]),
                      interval_count: z
                        .number()
                        .int()
                        .safe()
                        .finite()
                        .optional(),
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
                  request_extended_authorization: z
                    .enum(['if_available', 'never'])
                    .optional(),
                  request_incremental_authorization: z
                    .enum(['if_available', 'never'])
                    .optional(),
                  request_multicapture: z
                    .enum(['if_available', 'never'])
                    .optional(),
                  request_overcapture: z
                    .enum(['if_available', 'never'])
                    .optional(),
                  request_three_d_secure: z
                    .enum(['any', 'automatic', 'challenge'])
                    .optional(),
                  require_cvc_recollection: z.boolean().optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                  statement_descriptor_suffix_kana: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  statement_descriptor_suffix_kanji: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  three_d_secure: z
                    .object({
                      ares_trans_status: z
                        .enum(['A', 'C', 'I', 'N', 'R', 'U', 'Y'])
                        .optional(),
                      cryptogram: z.string(),
                      electronic_commerce_indicator: z
                        .enum(['01', '02', '05', '06', '07'])
                        .optional(),
                      exemption_indicator: z
                        .enum(['low_risk', 'none'])
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
                      transaction_id: z.string(),
                      version: z.enum(['1.0.2', '2.1.0', '2.2.0']),
                    })
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            card_present: z
              .union([
                z.object({
                  request_extended_authorization: z.boolean().optional(),
                  request_incremental_authorization_support: z
                    .boolean()
                    .optional(),
                  routing: z
                    .object({
                      requested_priority: z
                        .enum(['domestic', 'international'])
                        .optional(),
                    })
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            cashapp: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            customer_balance: z
              .union([
                z.object({
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
                }),
                z.enum(['']),
              ])
              .optional(),
            eps: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            fpx: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            giropay: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            grabpay: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            ideal: z
              .union([
                z.object({
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            interac_present: z.union([z.object({}), z.enum([''])]).optional(),
            klarna: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  preferred_locale: z
                    .enum([
                      'cs-CZ',
                      'da-DK',
                      'de-AT',
                      'de-CH',
                      'de-DE',
                      'el-GR',
                      'en-AT',
                      'en-AU',
                      'en-BE',
                      'en-CA',
                      'en-CH',
                      'en-CZ',
                      'en-DE',
                      'en-DK',
                      'en-ES',
                      'en-FI',
                      'en-FR',
                      'en-GB',
                      'en-GR',
                      'en-IE',
                      'en-IT',
                      'en-NL',
                      'en-NO',
                      'en-NZ',
                      'en-PL',
                      'en-PT',
                      'en-RO',
                      'en-SE',
                      'en-US',
                      'es-ES',
                      'es-US',
                      'fi-FI',
                      'fr-BE',
                      'fr-CA',
                      'fr-CH',
                      'fr-FR',
                      'it-CH',
                      'it-IT',
                      'nb-NO',
                      'nl-BE',
                      'nl-NL',
                      'pl-PL',
                      'pt-PT',
                      'ro-RO',
                      'sv-FI',
                      'sv-SE',
                    ])
                    .optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            konbini: z
              .union([
                z.object({
                  confirmation_number: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  expires_after_days: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  expires_at: z
                    .union([z.number().int().safe().finite(), z.enum([''])])
                    .optional(),
                  product_description: z
                    .union([z.string(), z.enum([''])])
                    .optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            link: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            mobilepay: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            multibanco: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            oxxo: z
              .union([
                z.object({
                  expires_after_days: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            p24: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                  tos_shown_and_accepted: z.boolean().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            paynow: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            paypal: z
              .union([
                z.object({
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
                }),
                z.enum(['']),
              ])
              .optional(),
            pix: z
              .union([
                z.object({
                  expires_after_seconds: z
                    .number()
                    .int()
                    .safe()
                    .finite()
                    .optional(),
                  expires_at: z.number().int().safe().finite().optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            promptpay: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            revolut_pay: z
              .union([
                z.object({
                  capture_method: z.enum(['', 'manual']).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            sepa_debit: z
              .union([
                z.object({
                  mandate_options: z.object({}).optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            sofort: z
              .union([
                z.object({
                  preferred_language: z
                    .enum(['', 'de', 'en', 'es', 'fr', 'it', 'nl', 'pl'])
                    .optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            swish: z
              .union([
                z.object({
                  reference: z.union([z.string(), z.enum([''])]).optional(),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            twint: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            us_bank_account: z
              .union([
                z.object({
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
                        .array(
                          z.enum(['balances', 'ownership', 'transactions'])
                        )
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
                  preferred_settlement_speed: z
                    .enum(['', 'fastest', 'standard'])
                    .optional(),
                  setup_future_usage: z
                    .enum(['', 'none', 'off_session', 'on_session'])
                    .optional(),
                  verification_method: z
                    .enum(['automatic', 'instant', 'microdeposits'])
                    .optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            wechat_pay: z
              .union([
                z.object({
                  app_id: z.string().optional(),
                  client: z.enum(['android', 'ios', 'web']),
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
            zip: z
              .union([
                z.object({
                  setup_future_usage: z.enum(['none']).optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        payment_method_types: z.array(z.string()).optional(),
        receipt_email: z.union([z.string(), z.enum([''])]).optional(),
        setup_future_usage: z
          .enum(['', 'off_session', 'on_session'])
          .optional(),
        shipping: z
          .union([
            z.object({
              address: z.object({
                city: z.string().optional(),
                country: z.string().optional(),
                line1: z.string().optional(),
                line2: z.string().optional(),
                postal_code: z.string().optional(),
                state: z.string().optional(),
              }),
              carrier: z.string().optional(),
              name: z.string(),
              phone: z.string().optional(),
              tracking_number: z.string().optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        statement_descriptor: z.string().optional(),
        statement_descriptor_suffix: z.string().optional(),
        transfer_data: z
          .object({
            amount: z.number().int().safe().finite().optional(),
          })
          .optional(),
        transfer_group: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_intent,
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

export type PostPaymentIntentsIntentRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      application_fee_amount?: number | '';
      capture_method?: 'automatic' | 'automatic_async' | 'manual';
      currency?: string;
      customer?: string;
      description?: string;
      expand?: string[];
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
        acss_debit?: (
          | {
              mandate_options?: {
                custom_mandate_url?: string | '';
                interval_description?: string;
                payment_schedule?: 'combined' | 'interval' | 'sporadic';
                transaction_type?: 'business' | 'personal';
              };
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
              verification_method?: 'automatic' | 'instant' | 'microdeposits';
            }
          | ''
        ) &
          Partial<{
            mandate_options?: {
              custom_mandate_url?: string | '';
              interval_description?: string;
              payment_schedule?: 'combined' | 'interval' | 'sporadic';
              transaction_type?: 'business' | 'personal';
            };
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            verification_method?: 'automatic' | 'instant' | 'microdeposits';
          }>;
        affirm?: (
          | {
              capture_method?: '' | 'manual';
              preferred_locale?: string;
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            preferred_locale?: string;
            setup_future_usage?: 'none';
          }>;
        afterpay_clearpay?: (
          | {
              capture_method?: '' | 'manual';
              reference?: string;
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            reference?: string;
            setup_future_usage?: 'none';
          }>;
        alipay?: (
          | {
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        amazon_pay?: (
          | {
              capture_method?: '' | 'manual';
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        au_becs_debit?: (
          | {
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
          }>;
        bacs_debit?: (
          | {
              mandate_options?: {};
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            }
          | ''
        ) &
          Partial<{
            mandate_options?: {};
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
          }>;
        bancontact?: (
          | {
              preferred_language?: 'de' | 'en' | 'fr' | 'nl';
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            preferred_language?: 'de' | 'en' | 'fr' | 'nl';
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        blik?: (
          | {
              code?: string;
              setup_future_usage?: '' | 'none';
            }
          | ''
        ) &
          Partial<{
            code?: string;
            setup_future_usage?: '' | 'none';
          }>;
        boleto?: (
          | {
              expires_after_days?: number; // int
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            }
          | ''
        ) &
          Partial<{
            expires_after_days?: number; // int
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
          }>;
        card?: (
          | {
              capture_method?: '' | 'manual';
              cvc_token?: string;
              installments?: {
                enabled?: boolean;
                plan?: (
                  | {
                      count?: number; // int
                      interval?: 'month';
                      type: 'fixed_count';
                    }
                  | ''
                ) &
                  Partial<{
                    count?: number; // int
                    interval?: 'month';
                    type: 'fixed_count';
                  }>;
              };
              mandate_options?: {
                amount: number; // int
                amount_type: 'fixed' | 'maximum';
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
              request_extended_authorization?: 'if_available' | 'never';
              request_incremental_authorization?: 'if_available' | 'never';
              request_multicapture?: 'if_available' | 'never';
              request_overcapture?: 'if_available' | 'never';
              request_three_d_secure?: 'any' | 'automatic' | 'challenge';
              require_cvc_recollection?: boolean;
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
              statement_descriptor_suffix_kana?: string | '';
              statement_descriptor_suffix_kanji?: string | '';
              three_d_secure?: {
                ares_trans_status?: 'A' | 'C' | 'I' | 'N' | 'R' | 'U' | 'Y';
                cryptogram: string;
                electronic_commerce_indicator?:
                  | '01'
                  | '02'
                  | '05'
                  | '06'
                  | '07';
                exemption_indicator?: 'low_risk' | 'none';
                network_options?: {
                  cartes_bancaires?: {
                    cb_avalgo: '0' | '1' | '2' | '3' | '4' | 'A';
                    cb_exemption?: string;
                    cb_score?: number; // int
                  };
                };
                requestor_challenge_indicator?: string;
                transaction_id: string;
                version: '1.0.2' | '2.1.0' | '2.2.0';
              };
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            cvc_token?: string;
            installments?: {
              enabled?: boolean;
              plan?: (
                | {
                    count?: number; // int
                    interval?: 'month';
                    type: 'fixed_count';
                  }
                | ''
              ) &
                Partial<{
                  count?: number; // int
                  interval?: 'month';
                  type: 'fixed_count';
                }>;
            };
            mandate_options?: {
              amount: number; // int
              amount_type: 'fixed' | 'maximum';
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
            request_extended_authorization?: 'if_available' | 'never';
            request_incremental_authorization?: 'if_available' | 'never';
            request_multicapture?: 'if_available' | 'never';
            request_overcapture?: 'if_available' | 'never';
            request_three_d_secure?: 'any' | 'automatic' | 'challenge';
            require_cvc_recollection?: boolean;
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            statement_descriptor_suffix_kana?: string | '';
            statement_descriptor_suffix_kanji?: string | '';
            three_d_secure?: {
              ares_trans_status?: 'A' | 'C' | 'I' | 'N' | 'R' | 'U' | 'Y';
              cryptogram: string;
              electronic_commerce_indicator?: '01' | '02' | '05' | '06' | '07';
              exemption_indicator?: 'low_risk' | 'none';
              network_options?: {
                cartes_bancaires?: {
                  cb_avalgo: '0' | '1' | '2' | '3' | '4' | 'A';
                  cb_exemption?: string;
                  cb_score?: number; // int
                };
              };
              requestor_challenge_indicator?: string;
              transaction_id: string;
              version: '1.0.2' | '2.1.0' | '2.2.0';
            };
          }>;
        card_present?: (
          | {
              request_extended_authorization?: boolean;
              request_incremental_authorization_support?: boolean;
              routing?: {
                requested_priority?: 'domestic' | 'international';
              };
            }
          | ''
        ) &
          Partial<{
            request_extended_authorization?: boolean;
            request_incremental_authorization_support?: boolean;
            routing?: {
              requested_priority?: 'domestic' | 'international';
            };
          }>;
        cashapp?: (
          | {
              capture_method?: '' | 'manual';
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
          }>;
        customer_balance?: (
          | {
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
            }
          | ''
        ) &
          Partial<{
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
          }>;
        eps?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        fpx?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        giropay?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        grabpay?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        ideal?: (
          | {
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        interac_present?: {} | '';
        klarna?: (
          | {
              capture_method?: '' | 'manual';
              preferred_locale?:
                | 'cs-CZ'
                | 'da-DK'
                | 'de-AT'
                | 'de-CH'
                | 'de-DE'
                | 'el-GR'
                | 'en-AT'
                | 'en-AU'
                | 'en-BE'
                | 'en-CA'
                | 'en-CH'
                | 'en-CZ'
                | 'en-DE'
                | 'en-DK'
                | 'en-ES'
                | 'en-FI'
                | 'en-FR'
                | 'en-GB'
                | 'en-GR'
                | 'en-IE'
                | 'en-IT'
                | 'en-NL'
                | 'en-NO'
                | 'en-NZ'
                | 'en-PL'
                | 'en-PT'
                | 'en-RO'
                | 'en-SE'
                | 'en-US'
                | 'es-ES'
                | 'es-US'
                | 'fi-FI'
                | 'fr-BE'
                | 'fr-CA'
                | 'fr-CH'
                | 'fr-FR'
                | 'it-CH'
                | 'it-IT'
                | 'nb-NO'
                | 'nl-BE'
                | 'nl-NL'
                | 'pl-PL'
                | 'pt-PT'
                | 'ro-RO'
                | 'sv-FI'
                | 'sv-SE';
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            preferred_locale?:
              | 'cs-CZ'
              | 'da-DK'
              | 'de-AT'
              | 'de-CH'
              | 'de-DE'
              | 'el-GR'
              | 'en-AT'
              | 'en-AU'
              | 'en-BE'
              | 'en-CA'
              | 'en-CH'
              | 'en-CZ'
              | 'en-DE'
              | 'en-DK'
              | 'en-ES'
              | 'en-FI'
              | 'en-FR'
              | 'en-GB'
              | 'en-GR'
              | 'en-IE'
              | 'en-IT'
              | 'en-NL'
              | 'en-NO'
              | 'en-NZ'
              | 'en-PL'
              | 'en-PT'
              | 'en-RO'
              | 'en-SE'
              | 'en-US'
              | 'es-ES'
              | 'es-US'
              | 'fi-FI'
              | 'fr-BE'
              | 'fr-CA'
              | 'fr-CH'
              | 'fr-FR'
              | 'it-CH'
              | 'it-IT'
              | 'nb-NO'
              | 'nl-BE'
              | 'nl-NL'
              | 'pl-PL'
              | 'pt-PT'
              | 'ro-RO'
              | 'sv-FI'
              | 'sv-SE';
            setup_future_usage?: 'none';
          }>;
        konbini?: (
          | {
              confirmation_number?: string | '';
              expires_after_days?: number | '';
              expires_at?: number | '';
              product_description?: string | '';
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            confirmation_number?: string | '';
            expires_after_days?: number | '';
            expires_at?: number | '';
            product_description?: string | '';
            setup_future_usage?: 'none';
          }>;
        link?: (
          | {
              capture_method?: '' | 'manual';
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        mobilepay?: (
          | {
              capture_method?: '' | 'manual';
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            setup_future_usage?: 'none';
          }>;
        multibanco?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        oxxo?: (
          | {
              expires_after_days?: number; // int
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            expires_after_days?: number; // int
            setup_future_usage?: 'none';
          }>;
        p24?: (
          | {
              setup_future_usage?: 'none';
              tos_shown_and_accepted?: boolean;
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
            tos_shown_and_accepted?: boolean;
          }>;
        paynow?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        paypal?: (
          | {
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
            }
          | ''
        ) &
          Partial<{
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
          }>;
        pix?: (
          | {
              expires_after_seconds?: number; // int
              expires_at?: number; // int
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            expires_after_seconds?: number; // int
            expires_at?: number; // int
            setup_future_usage?: 'none';
          }>;
        promptpay?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        revolut_pay?: (
          | {
              capture_method?: '' | 'manual';
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            capture_method?: '' | 'manual';
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        sepa_debit?: (
          | {
              mandate_options?: {};
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            }
          | ''
        ) &
          Partial<{
            mandate_options?: {};
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
          }>;
        sofort?: (
          | {
              preferred_language?:
                | ''
                | 'de'
                | 'en'
                | 'es'
                | 'fr'
                | 'it'
                | 'nl'
                | 'pl';
              setup_future_usage?: '' | 'none' | 'off_session';
            }
          | ''
        ) &
          Partial<{
            preferred_language?:
              | ''
              | 'de'
              | 'en'
              | 'es'
              | 'fr'
              | 'it'
              | 'nl'
              | 'pl';
            setup_future_usage?: '' | 'none' | 'off_session';
          }>;
        swish?: (
          | {
              reference?: string | '';
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            reference?: string | '';
            setup_future_usage?: 'none';
          }>;
        twint?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
        us_bank_account?: (
          | {
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
              preferred_settlement_speed?: '' | 'fastest' | 'standard';
              setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
              verification_method?: 'automatic' | 'instant' | 'microdeposits';
            }
          | ''
        ) &
          Partial<{
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
            preferred_settlement_speed?: '' | 'fastest' | 'standard';
            setup_future_usage?: '' | 'none' | 'off_session' | 'on_session';
            verification_method?: 'automatic' | 'instant' | 'microdeposits';
          }>;
        wechat_pay?: (
          | {
              app_id?: string;
              client: 'android' | 'ios' | 'web';
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            app_id?: string;
            client: 'android' | 'ios' | 'web';
            setup_future_usage?: 'none';
          }>;
        zip?: (
          | {
              setup_future_usage?: 'none';
            }
          | ''
        ) &
          Partial<{
            setup_future_usage?: 'none';
          }>;
      };
      payment_method_types?: string[];
      receipt_email?: string | '';
      setup_future_usage?: '' | 'off_session' | 'on_session';
      shipping?: (
        | {
            address: {
              city?: string;
              country?: string;
              line1?: string;
              line2?: string;
              postal_code?: string;
              state?: string;
            };
            carrier?: string;
            name: string;
            phone?: string;
            tracking_number?: string;
          }
        | ''
      ) &
        Partial<{
          address: {
            city?: string;
            country?: string;
            line1?: string;
            line2?: string;
            postal_code?: string;
            state?: string;
          };
          carrier?: string;
          name: string;
          phone?: string;
          tracking_number?: string;
        }>;
      statement_descriptor?: string;
      statement_descriptor_suffix?: string;
      transfer_data?: {
        amount?: number; // int
      };
      transfer_group?: string;
    }
  >,
  {
    intent: string;
  }
>;

export type PostPaymentIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentIntentsIntentRequestResult = RequestResult<
  PostPaymentIntentsIntentRequest,
  PostPaymentIntentsIntentResponse
>;

export function postPaymentIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentIntentsIntentEndpointSchema, payload),
    config
  );
}
