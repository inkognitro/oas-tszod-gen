import {z_Tax_Calculation, Tax_Calculation} from './tax';
import {z_Error, Error} from './schemas';
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

export const postTaxCalculationsEndpointSchema = {
  path: '/v1/tax/calculations',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        currency: z.string(),
        customer: z.string().optional(),
        customer_details: z
          .object({
            address: z
              .object({
                city: z.union([z.string(), z.enum([''])]).optional(),
                country: z.string(),
                line1: z.union([z.string(), z.enum([''])]).optional(),
                line2: z.union([z.string(), z.enum([''])]).optional(),
                postal_code: z.union([z.string(), z.enum([''])]).optional(),
                state: z.union([z.string(), z.enum([''])]).optional(),
              })
              .optional(),
            address_source: z.enum(['billing', 'shipping']).optional(),
            ip_address: z.string().optional(),
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
            taxability_override: z
              .enum(['customer_exempt', 'none', 'reverse_charge'])
              .optional(),
          })
          .optional(),
        expand: z.array(z.string()).optional(),
        line_items: z.array(
          z.object({
            amount: z.number().int().safe().finite(),
            product: z.string().optional(),
            quantity: z.number().int().safe().finite().optional(),
            reference: z.string().optional(),
            tax_behavior: z.enum(['exclusive', 'inclusive']).optional(),
            tax_code: z.string().optional(),
          })
        ),
        ship_from_details: z
          .object({
            address: z.object({
              city: z.union([z.string(), z.enum([''])]).optional(),
              country: z.string(),
              line1: z.union([z.string(), z.enum([''])]).optional(),
              line2: z.union([z.string(), z.enum([''])]).optional(),
              postal_code: z.union([z.string(), z.enum([''])]).optional(),
              state: z.union([z.string(), z.enum([''])]).optional(),
            }),
          })
          .optional(),
        shipping_cost: z
          .object({
            amount: z.number().int().safe().finite().optional(),
            shipping_rate: z.string().optional(),
            tax_behavior: z.enum(['exclusive', 'inclusive']).optional(),
            tax_code: z.string().optional(),
          })
          .optional(),
        tax_date: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Tax_Calculation,
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

export type PostTaxCalculationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      currency: string;
      customer?: string;
      customer_details?: {
        address?: {
          city?: string | '';
          country: string;
          line1?: string | '';
          line2?: string | '';
          postal_code?: string | '';
          state?: string | '';
        };
        address_source?: 'billing' | 'shipping';
        ip_address?: string;
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
        taxability_override?: 'customer_exempt' | 'none' | 'reverse_charge';
      };
      expand?: string[];
      line_items: {
        amount: number; // int
        product?: string;
        quantity?: number; // int
        reference?: string;
        tax_behavior?: 'exclusive' | 'inclusive';
        tax_code?: string;
      }[];
      ship_from_details?: {
        address: {
          city?: string | '';
          country: string;
          line1?: string | '';
          line2?: string | '';
          postal_code?: string | '';
          state?: string | '';
        };
      };
      shipping_cost?: {
        amount?: number; // int
        shipping_rate?: string;
        tax_behavior?: 'exclusive' | 'inclusive';
        tax_code?: string;
      };
      tax_date?: number; // int
    }
  >
>;

export type PostTaxCalculationsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Calculation>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxCalculationsRequestResult = RequestResult<
  PostTaxCalculationsRequest,
  PostTaxCalculationsResponse
>;

export function postTaxCalculations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxCalculationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxCalculationsRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxCalculationsEndpointSchema, payload),
    config
  );
}
