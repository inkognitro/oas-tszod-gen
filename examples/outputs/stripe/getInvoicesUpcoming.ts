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
import {Invoice, Error} from './schemas';

export const getInvoicesUpcomingEndpointSchema = {
  path: '/v1/invoices/upcoming',
  method: 'get',
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

export type GetInvoicesUpcomingRequest = RequestUnion<
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

export type GetInvoicesUpcomingResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetInvoicesUpcomingRequestResult = RequestResult<
  GetInvoicesUpcomingRequest,
  GetInvoicesUpcomingResponse
>;

export function getInvoicesUpcoming(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetInvoicesUpcomingRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetInvoicesUpcomingRequestResult> {
  return requestHandler.execute(
    createRequest(getInvoicesUpcomingEndpointSchema, payload),
    config
  );
}
