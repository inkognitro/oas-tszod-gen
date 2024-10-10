import {z_Line_item, z_Error, Line_item, Error} from './schemas';
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

export const getInvoicesUpcomingLinesEndpointSchema = {
  path: '/v1/invoices/upcoming/lines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
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
    coupon: z.string().optional(),
    currency: z.string().optional(),
    customer: z.string().optional(),
    customer_details: z
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
              name: z.string(),
              phone: z.string().optional(),
            }),
            z.enum(['']),
          ])
          .optional(),
        tax: z
          .object({
            ip_address: z.union([z.string(), z.enum([''])]).optional(),
          })
          .optional(),
        tax_exempt: z.enum(['', 'exempt', 'none', 'reverse']).optional(),
        tax_ids: z
          .array(
            z.object({
              type: z.enum([
                'ad_nrt',
                'ae_trn',
                'ar_cuit',
                'au_abn',
                'au_arn',
                'bg_uic',
                'bh_vat',
                'bo_tin',
                'br_cnpj',
                'br_cpf',
                'ca_bn',
                'ca_gst_hst',
                'ca_pst_bc',
                'ca_pst_mb',
                'ca_pst_sk',
                'ca_qst',
                'ch_uid',
                'ch_vat',
                'cl_tin',
                'cn_tin',
                'co_nit',
                'cr_tin',
                'de_stn',
                'do_rcn',
                'ec_ruc',
                'eg_tin',
                'es_cif',
                'eu_oss_vat',
                'eu_vat',
                'gb_vat',
                'ge_vat',
                'hk_br',
                'hr_oib',
                'hu_tin',
                'id_npwp',
                'il_vat',
                'in_gst',
                'is_vat',
                'jp_cn',
                'jp_rn',
                'jp_trn',
                'ke_pin',
                'kr_brn',
                'kz_bin',
                'li_uid',
                'mx_rfc',
                'my_frp',
                'my_itn',
                'my_sst',
                'ng_tin',
                'no_vat',
                'no_voec',
                'nz_gst',
                'om_vat',
                'pe_ruc',
                'ph_tin',
                'ro_tin',
                'rs_pib',
                'ru_inn',
                'ru_kpp',
                'sa_vat',
                'sg_gst',
                'sg_uen',
                'si_tin',
                'sv_nit',
                'th_vat',
                'tr_tin',
                'tw_vat',
                'ua_vat',
                'us_ein',
                'uy_ruc',
                've_rif',
                'vn_tin',
                'za_vat',
              ]),
              value: z.string(),
            })
          )
          .optional(),
      })
      .optional(),
    discounts: z
      .union([
        z.array(
          z.object({
            coupon: z.string().optional(),
            discount: z.string().optional(),
            promotion_code: z.string().optional(),
          })
        ),
        z.enum(['']),
      ])
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    invoice_items: z
      .array(
        z.object({
          amount: z.number().int().safe().finite().optional(),
          currency: z.string().optional(),
          description: z.string().optional(),
          discountable: z.boolean().optional(),
          discounts: z
            .union([
              z.array(
                z.object({
                  coupon: z.string().optional(),
                  discount: z.string().optional(),
                  promotion_code: z.string().optional(),
                })
              ),
              z.enum(['']),
            ])
            .optional(),
          invoiceitem: z.string().optional(),
          metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
          period: z
            .object({
              end: z.number().int().safe().finite(),
              start: z.number().int().safe().finite(),
            })
            .optional(),
          price: z.string().optional(),
          price_data: z
            .object({
              currency: z.string(),
              product: z.string(),
              tax_behavior: z
                .enum(['exclusive', 'inclusive', 'unspecified'])
                .optional(),
              unit_amount: z.number().int().safe().finite().optional(),
              unit_amount_decimal: z.string().optional(),
            })
            .optional(),
          quantity: z.number().int().safe().finite().optional(),
          tax_behavior: z
            .enum(['exclusive', 'inclusive', 'unspecified'])
            .optional(),
          tax_code: z.union([z.string(), z.enum([''])]).optional(),
          tax_rates: z.union([z.array(z.string()), z.enum([''])]).optional(),
          unit_amount: z.number().int().safe().finite().optional(),
          unit_amount_decimal: z.string().optional(),
        })
      )
      .optional(),
    issuer: z
      .object({
        account: z.string().optional(),
        type: z.enum(['account', 'self']),
      })
      .optional(),
    limit: z.number().int().safe().finite().optional(),
    on_behalf_of: z.union([z.string(), z.enum([''])]).optional(),
    preview_mode: z.enum(['next', 'recurring']).optional(),
    schedule: z.string().optional(),
    schedule_details: z
      .object({
        end_behavior: z.enum(['cancel', 'release']).optional(),
        phases: z
          .array(
            z.object({
              add_invoice_items: z
                .array(
                  z.object({
                    discounts: z
                      .array(
                        z.object({
                          coupon: z.string().optional(),
                          discount: z.string().optional(),
                          promotion_code: z.string().optional(),
                        })
                      )
                      .optional(),
                    price: z.string().optional(),
                    price_data: z
                      .object({
                        currency: z.string(),
                        product: z.string(),
                        tax_behavior: z
                          .enum(['exclusive', 'inclusive', 'unspecified'])
                          .optional(),
                        unit_amount: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
                        unit_amount_decimal: z.string().optional(),
                      })
                      .optional(),
                    quantity: z.number().int().safe().finite().optional(),
                    tax_rates: z
                      .union([z.array(z.string()), z.enum([''])])
                      .optional(),
                  })
                )
                .optional(),
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
              billing_cycle_anchor: z
                .enum(['automatic', 'phase_start'])
                .optional(),
              billing_thresholds: z
                .union([
                  z.object({
                    amount_gte: z.number().int().safe().finite().optional(),
                    reset_billing_cycle_anchor: z.boolean().optional(),
                  }),
                  z.enum(['']),
                ])
                .optional(),
              collection_method: z
                .enum(['charge_automatically', 'send_invoice'])
                .optional(),
              coupon: z.string().optional(),
              default_payment_method: z.string().optional(),
              default_tax_rates: z
                .union([z.array(z.string()), z.enum([''])])
                .optional(),
              description: z.union([z.string(), z.enum([''])]).optional(),
              discounts: z
                .union([
                  z.array(
                    z.object({
                      coupon: z.string().optional(),
                      discount: z.string().optional(),
                      promotion_code: z.string().optional(),
                    })
                  ),
                  z.enum(['']),
                ])
                .optional(),
              end_date: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
              invoice_settings: z
                .object({
                  account_tax_ids: z
                    .union([z.array(z.string()), z.enum([''])])
                    .optional(),
                  days_until_due: z.number().int().safe().finite().optional(),
                  issuer: z
                    .object({
                      account: z.string().optional(),
                      type: z.enum(['account', 'self']),
                    })
                    .optional(),
                })
                .optional(),
              items: z.array(
                z.object({
                  billing_thresholds: z
                    .union([
                      z.object({
                        usage_gte: z.number().int().safe().finite(),
                      }),
                      z.enum(['']),
                    ])
                    .optional(),
                  discounts: z
                    .union([
                      z.array(
                        z.object({
                          coupon: z.string().optional(),
                          discount: z.string().optional(),
                          promotion_code: z.string().optional(),
                        })
                      ),
                      z.enum(['']),
                    ])
                    .optional(),
                  metadata: z.record(z.string()).optional(),
                  price: z.string().optional(),
                  price_data: z
                    .object({
                      currency: z.string(),
                      product: z.string(),
                      recurring: z.object({
                        interval: z.enum(['day', 'month', 'week', 'year']),
                        interval_count: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
                      }),
                      tax_behavior: z
                        .enum(['exclusive', 'inclusive', 'unspecified'])
                        .optional(),
                      unit_amount: z.number().int().safe().finite().optional(),
                      unit_amount_decimal: z.string().optional(),
                    })
                    .optional(),
                  quantity: z.number().int().safe().finite().optional(),
                  tax_rates: z
                    .union([z.array(z.string()), z.enum([''])])
                    .optional(),
                })
              ),
              iterations: z.number().int().safe().finite().optional(),
              metadata: z.record(z.string()).optional(),
              on_behalf_of: z.string().optional(),
              proration_behavior: z
                .enum(['always_invoice', 'create_prorations', 'none'])
                .optional(),
              start_date: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
              transfer_data: z
                .object({
                  amount_percent: z.number().safe().finite().optional(),
                  destination: z.string(),
                })
                .optional(),
              trial: z.boolean().optional(),
              trial_end: z
                .union([z.number().int().safe().finite(), z.enum(['now'])])
                .optional(),
            })
          )
          .optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
      })
      .optional(),
    starting_after: z.string().optional(),
    subscription: z.string().optional(),
    subscription_billing_cycle_anchor: z
      .union([z.enum(['now', 'unchanged']), z.number().int().safe().finite()])
      .optional(),
    subscription_cancel_at: z
      .union([z.number().int().safe().finite(), z.enum([''])])
      .optional(),
    subscription_cancel_at_period_end: z.boolean().optional(),
    subscription_cancel_now: z.boolean().optional(),
    subscription_default_tax_rates: z
      .union([z.array(z.string()), z.enum([''])])
      .optional(),
    subscription_details: z
      .object({
        billing_cycle_anchor: z
          .union([
            z.enum(['now', 'unchanged']),
            z.number().int().safe().finite(),
          ])
          .optional(),
        cancel_at: z
          .union([z.number().int().safe().finite(), z.enum([''])])
          .optional(),
        cancel_at_period_end: z.boolean().optional(),
        cancel_now: z.boolean().optional(),
        default_tax_rates: z
          .union([z.array(z.string()), z.enum([''])])
          .optional(),
        items: z
          .array(
            z.object({
              billing_thresholds: z
                .union([
                  z.object({
                    usage_gte: z.number().int().safe().finite(),
                  }),
                  z.enum(['']),
                ])
                .optional(),
              clear_usage: z.boolean().optional(),
              deleted: z.boolean().optional(),
              discounts: z
                .union([
                  z.array(
                    z.object({
                      coupon: z.string().optional(),
                      discount: z.string().optional(),
                      promotion_code: z.string().optional(),
                    })
                  ),
                  z.enum(['']),
                ])
                .optional(),
              id: z.string().optional(),
              metadata: z
                .union([z.record(z.string()), z.enum([''])])
                .optional(),
              price: z.string().optional(),
              price_data: z
                .object({
                  currency: z.string(),
                  product: z.string(),
                  recurring: z.object({
                    interval: z.enum(['day', 'month', 'week', 'year']),
                    interval_count: z.number().int().safe().finite().optional(),
                  }),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                  unit_amount: z.number().int().safe().finite().optional(),
                  unit_amount_decimal: z.string().optional(),
                })
                .optional(),
              quantity: z.number().int().safe().finite().optional(),
              tax_rates: z
                .union([z.array(z.string()), z.enum([''])])
                .optional(),
            })
          )
          .optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
        proration_date: z.number().int().safe().finite().optional(),
        resume_at: z.enum(['now']).optional(),
        start_date: z.number().int().safe().finite().optional(),
        trial_end: z
          .union([z.enum(['now']), z.number().int().safe().finite()])
          .optional(),
      })
      .optional(),
    subscription_items: z
      .array(
        z.object({
          billing_thresholds: z
            .union([
              z.object({
                usage_gte: z.number().int().safe().finite(),
              }),
              z.enum(['']),
            ])
            .optional(),
          clear_usage: z.boolean().optional(),
          deleted: z.boolean().optional(),
          discounts: z
            .union([
              z.array(
                z.object({
                  coupon: z.string().optional(),
                  discount: z.string().optional(),
                  promotion_code: z.string().optional(),
                })
              ),
              z.enum(['']),
            ])
            .optional(),
          id: z.string().optional(),
          metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
          price: z.string().optional(),
          price_data: z
            .object({
              currency: z.string(),
              product: z.string(),
              recurring: z.object({
                interval: z.enum(['day', 'month', 'week', 'year']),
                interval_count: z.number().int().safe().finite().optional(),
              }),
              tax_behavior: z
                .enum(['exclusive', 'inclusive', 'unspecified'])
                .optional(),
              unit_amount: z.number().int().safe().finite().optional(),
              unit_amount_decimal: z.string().optional(),
            })
            .optional(),
          quantity: z.number().int().safe().finite().optional(),
          tax_rates: z.union([z.array(z.string()), z.enum([''])]).optional(),
        })
      )
      .optional(),
    subscription_proration_behavior: z
      .enum(['always_invoice', 'create_prorations', 'none'])
      .optional(),
    subscription_proration_date: z.number().int().safe().finite().optional(),
    subscription_resume_at: z.enum(['now']).optional(),
    subscription_start_date: z.number().int().safe().finite().optional(),
    subscription_trial_end: z
      .union([z.enum(['now']), z.number().int().safe().finite()])
      .optional(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Line_item),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetInvoicesUpcomingLinesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    automatic_tax?: {
      enabled: boolean;
      liability?: {
        account?: string;
        type: 'account' | 'self';
      };
    };
    coupon?: string;
    currency?: string;
    customer?: string;
    customer_details?: {
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
            name: string;
            phone?: string;
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
          name: string;
          phone?: string;
        }>;
      tax?: {
        ip_address?: string | '';
      };
      tax_exempt?: '' | 'exempt' | 'none' | 'reverse';
      tax_ids?: {
        type:
          | 'ad_nrt'
          | 'ae_trn'
          | 'ar_cuit'
          | 'au_abn'
          | 'au_arn'
          | 'bg_uic'
          | 'bh_vat'
          | 'bo_tin'
          | 'br_cnpj'
          | 'br_cpf'
          | 'ca_bn'
          | 'ca_gst_hst'
          | 'ca_pst_bc'
          | 'ca_pst_mb'
          | 'ca_pst_sk'
          | 'ca_qst'
          | 'ch_uid'
          | 'ch_vat'
          | 'cl_tin'
          | 'cn_tin'
          | 'co_nit'
          | 'cr_tin'
          | 'de_stn'
          | 'do_rcn'
          | 'ec_ruc'
          | 'eg_tin'
          | 'es_cif'
          | 'eu_oss_vat'
          | 'eu_vat'
          | 'gb_vat'
          | 'ge_vat'
          | 'hk_br'
          | 'hr_oib'
          | 'hu_tin'
          | 'id_npwp'
          | 'il_vat'
          | 'in_gst'
          | 'is_vat'
          | 'jp_cn'
          | 'jp_rn'
          | 'jp_trn'
          | 'ke_pin'
          | 'kr_brn'
          | 'kz_bin'
          | 'li_uid'
          | 'mx_rfc'
          | 'my_frp'
          | 'my_itn'
          | 'my_sst'
          | 'ng_tin'
          | 'no_vat'
          | 'no_voec'
          | 'nz_gst'
          | 'om_vat'
          | 'pe_ruc'
          | 'ph_tin'
          | 'ro_tin'
          | 'rs_pib'
          | 'ru_inn'
          | 'ru_kpp'
          | 'sa_vat'
          | 'sg_gst'
          | 'sg_uen'
          | 'si_tin'
          | 'sv_nit'
          | 'th_vat'
          | 'tr_tin'
          | 'tw_vat'
          | 'ua_vat'
          | 'us_ein'
          | 'uy_ruc'
          | 've_rif'
          | 'vn_tin'
          | 'za_vat';
        value: string;
      }[];
    };
    discounts?:
      | {
          coupon?: string;
          discount?: string;
          promotion_code?: string;
        }[]
      | '';
    ending_before?: string;
    expand?: string[];
    invoice_items?: {
      amount?: number; // int
      currency?: string;
      description?: string;
      discountable?: boolean;
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      invoiceitem?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      period?: {
        end: number; // int
        start: number; // int
      };
      price?: string;
      price_data?: {
        currency: string;
        product: string;
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      quantity?: number; // int
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tax_code?: string | '';
      tax_rates?: string[] | '';
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }[];
    issuer?: {
      account?: string;
      type: 'account' | 'self';
    };
    limit?: number; // int
    on_behalf_of?: string | '';
    preview_mode?: 'next' | 'recurring';
    schedule?: string;
    schedule_details?: {
      end_behavior?: 'cancel' | 'release';
      phases?: {
        add_invoice_items?: {
          discounts?: {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[];
          price?: string;
          price_data?: {
            currency: string;
            product: string;
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
          };
          quantity?: number; // int
          tax_rates?: string[] | '';
        }[];
        application_fee_percent?: number;
        automatic_tax?: {
          enabled: boolean;
          liability?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        billing_cycle_anchor?: 'automatic' | 'phase_start';
        billing_thresholds?: (
          | {
              amount_gte?: number; // int
              reset_billing_cycle_anchor?: boolean;
            }
          | ''
        ) &
          Partial<{
            amount_gte?: number; // int
            reset_billing_cycle_anchor?: boolean;
          }>;
        collection_method?: 'charge_automatically' | 'send_invoice';
        coupon?: string;
        default_payment_method?: string;
        default_tax_rates?: string[] | '';
        description?: string | '';
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        end_date?: number | 'now';
        invoice_settings?: {
          account_tax_ids?: string[] | '';
          days_until_due?: number; // int
          issuer?: {
            account?: string;
            type: 'account' | 'self';
          };
        };
        items: {
          billing_thresholds?: (
            | {
                usage_gte: number; // int
              }
            | ''
          ) &
            Partial<{
              usage_gte: number; // int
            }>;
          discounts?:
            | {
                coupon?: string;
                discount?: string;
                promotion_code?: string;
              }[]
            | '';
          metadata?: {
            [key: string]: string;
          };
          price?: string;
          price_data?: {
            currency: string;
            product: string;
            recurring: {
              interval: 'day' | 'month' | 'week' | 'year';
              interval_count?: number; // int
            };
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
          };
          quantity?: number; // int
          tax_rates?: string[] | '';
        }[];
        iterations?: number; // int
        metadata?: {
          [key: string]: string;
        };
        on_behalf_of?: string;
        proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
        start_date?: number | 'now';
        transfer_data?: {
          amount_percent?: number;
          destination: string;
        };
        trial?: boolean;
        trial_end?: number | 'now';
      }[];
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
    };
    starting_after?: string;
    subscription?: string;
    subscription_billing_cycle_anchor?: 'now' | 'unchanged' | number;
    subscription_cancel_at?: number | '';
    subscription_cancel_at_period_end?: boolean;
    subscription_cancel_now?: boolean;
    subscription_default_tax_rates?: string[] | '';
    subscription_details?: {
      billing_cycle_anchor?: 'now' | 'unchanged' | number;
      cancel_at?: number | '';
      cancel_at_period_end?: boolean;
      cancel_now?: boolean;
      default_tax_rates?: string[] | '';
      items?: {
        billing_thresholds?: (
          | {
              usage_gte: number; // int
            }
          | ''
        ) &
          Partial<{
            usage_gte: number; // int
          }>;
        clear_usage?: boolean;
        deleted?: boolean;
        discounts?:
          | {
              coupon?: string;
              discount?: string;
              promotion_code?: string;
            }[]
          | '';
        id?: string;
        metadata?:
          | {
              [key: string]: string;
            }
          | '';
        price?: string;
        price_data?: {
          currency: string;
          product: string;
          recurring: {
            interval: 'day' | 'month' | 'week' | 'year';
            interval_count?: number; // int
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
        quantity?: number; // int
        tax_rates?: string[] | '';
      }[];
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
      proration_date?: number; // int
      resume_at?: 'now';
      start_date?: number; // int
      trial_end?: 'now' | number;
    };
    subscription_items?: {
      billing_thresholds?: (
        | {
            usage_gte: number; // int
          }
        | ''
      ) &
        Partial<{
          usage_gte: number; // int
        }>;
      clear_usage?: boolean;
      deleted?: boolean;
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      id?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      price?: string;
      price_data?: {
        currency: string;
        product: string;
        recurring: {
          interval: 'day' | 'month' | 'week' | 'year';
          interval_count?: number; // int
        };
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      quantity?: number; // int
      tax_rates?: string[] | '';
    }[];
    subscription_proration_behavior?:
      | 'always_invoice'
      | 'create_prorations'
      | 'none';
    subscription_proration_date?: number; // int
    subscription_resume_at?: 'now';
    subscription_start_date?: number; // int
    subscription_trial_end?: 'now' | number;
  }
>;

export type GetInvoicesUpcomingLinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoicesUpcomingLinesRequestResult = RequestResult<
  GetInvoicesUpcomingLinesRequest,
  GetInvoicesUpcomingLinesResponse
>;

export function getInvoicesUpcomingLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoicesUpcomingLinesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoicesUpcomingLinesRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoicesUpcomingLinesEndpointSchema, payload),
    config
  );
}
