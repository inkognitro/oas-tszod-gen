import {
  z_Customer,
  z_Error,
  Customer,
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

export const postCustomersEndpointSchema = {
  path: '/v1/customers',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
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
        balance: z.number().int().safe().finite().optional(),
        cash_balance: z
          .object({
            settings: z
              .object({
                reconciliation_mode: z
                  .enum(['automatic', 'manual', 'merchant_default'])
                  .optional(),
              })
              .optional(),
          })
          .optional(),
        coupon: z.string().optional(),
        description: z.string().optional(),
        email: z.string().optional(),
        expand: z.array(z.string()).optional(),
        invoice_prefix: z.string().optional(),
        invoice_settings: z
          .object({
            custom_fields: z
              .union([
                z.array(
                  z.object({
                    name: z.string(),
                    value: z.string(),
                  })
                ),
                z.enum(['']),
              ])
              .optional(),
            default_payment_method: z.string().optional(),
            footer: z.string().optional(),
            rendering_options: z
              .union([
                z.object({
                  amount_tax_display: z
                    .enum(['', 'exclude_tax', 'include_inclusive_tax'])
                    .optional(),
                  template: z.string().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
        next_invoice_sequence: z.number().int().safe().finite().optional(),
        payment_method: z.string().optional(),
        phone: z.string().optional(),
        preferred_locales: z.array(z.string()).optional(),
        promotion_code: z.string().optional(),
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
        source: z.string().optional(),
        tax: z
          .object({
            ip_address: z.union([z.string(), z.enum([''])]).optional(),
            validate_location: z.enum(['deferred', 'immediately']).optional(),
          })
          .optional(),
        tax_exempt: z.enum(['', 'exempt', 'none', 'reverse']).optional(),
        tax_id_data: z
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
        test_clock: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Customer,
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

export type PostCustomersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
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
      balance?: number; // int
      cash_balance?: {
        settings?: {
          reconciliation_mode?: 'automatic' | 'manual' | 'merchant_default';
        };
      };
      coupon?: string;
      description?: string;
      email?: string;
      expand?: string[];
      invoice_prefix?: string;
      invoice_settings?: {
        custom_fields?:
          | {
              name: string;
              value: string;
            }[]
          | '';
        default_payment_method?: string;
        footer?: string;
        rendering_options?: (
          | {
              amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
              template?: string;
            }
          | ''
        ) &
          Partial<{
            amount_tax_display?: '' | 'exclude_tax' | 'include_inclusive_tax';
            template?: string;
          }>;
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      next_invoice_sequence?: number; // int
      payment_method?: string;
      phone?: string;
      preferred_locales?: string[];
      promotion_code?: string;
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
      source?: string;
      tax?: {
        ip_address?: string | '';
        validate_location?: 'deferred' | 'immediately';
      };
      tax_exempt?: '' | 'exempt' | 'none' | 'reverse';
      tax_id_data?: {
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
      test_clock?: string;
    }
  >
>;

export type PostCustomersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Customer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersRequestResult = RequestResult<
  PostCustomersRequest,
  PostCustomersResponse
>;

export function postCustomers(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCustomersRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersEndpointSchema, payload),
    config
  );
}
