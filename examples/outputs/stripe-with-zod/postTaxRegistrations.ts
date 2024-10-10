import {z_Tax_Registration, Tax_Registration} from './tax';
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

export const postTaxRegistrationsEndpointSchema = {
  path: '/v1/tax/registrations',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active_from: z.union([
          z.enum(['now']),
          z.number().int().safe().finite(),
        ]),
        country: z.string(),
        country_options: z.object({
          ae: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          at: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          au: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          be: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          bg: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          bh: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          ca: z
            .object({
              province_standard: z
                .object({
                  province: z.string(),
                })
                .optional(),
              type: z.enum(['province_standard', 'simplified', 'standard']),
            })
            .optional(),
          ch: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          cl: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          co: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          cy: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          cz: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          de: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          dk: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          ee: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          eg: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          es: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          fi: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          fr: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          gb: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          ge: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          gr: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          hr: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          hu: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          id: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          ie: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          is: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          it: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          jp: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          ke: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          kr: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          kz: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          lt: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          lu: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          lv: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          mt: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          mx: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          my: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          ng: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          nl: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          no: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          nz: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          om: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          pl: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          pt: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          ro: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          sa: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          se: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          sg: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
          si: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          sk: z
            .object({
              standard: z
                .object({
                  place_of_supply_scheme: z.enum(['small_seller', 'standard']),
                })
                .optional(),
              type: z.enum(['ioss', 'oss_non_union', 'oss_union', 'standard']),
            })
            .optional(),
          th: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          tr: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          us: z
            .object({
              local_amusement_tax: z
                .object({
                  jurisdiction: z.string(),
                })
                .optional(),
              local_lease_tax: z
                .object({
                  jurisdiction: z.string(),
                })
                .optional(),
              state: z.string(),
              state_sales_tax: z
                .object({
                  elections: z.array(
                    z.object({
                      jurisdiction: z.string().optional(),
                      type: z.enum([
                        'local_use_tax',
                        'simplified_sellers_use_tax',
                        'single_local_use_tax',
                      ]),
                    })
                  ),
                })
                .optional(),
              type: z.enum([
                'local_amusement_tax',
                'local_lease_tax',
                'state_communications_tax',
                'state_sales_tax',
              ]),
            })
            .optional(),
          vn: z
            .object({
              type: z.enum(['simplified']),
            })
            .optional(),
          za: z
            .object({
              type: z.enum(['standard']),
            })
            .optional(),
        }),
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Tax_Registration,
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

export type PostTaxRegistrationsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active_from: 'now' | number;
      country: string;
      country_options: {
        ae?: {
          type: 'standard';
        };
        at?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        au?: {
          type: 'standard';
        };
        be?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        bg?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        bh?: {
          type: 'standard';
        };
        ca?: {
          province_standard?: {
            province: string;
          };
          type: 'province_standard' | 'simplified' | 'standard';
        };
        ch?: {
          type: 'standard';
        };
        cl?: {
          type: 'simplified';
        };
        co?: {
          type: 'simplified';
        };
        cy?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        cz?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        de?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        dk?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        ee?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        eg?: {
          type: 'simplified';
        };
        es?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        fi?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        fr?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        gb?: {
          type: 'standard';
        };
        ge?: {
          type: 'simplified';
        };
        gr?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        hr?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        hu?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        id?: {
          type: 'simplified';
        };
        ie?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        is?: {
          type: 'standard';
        };
        it?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        jp?: {
          type: 'standard';
        };
        ke?: {
          type: 'simplified';
        };
        kr?: {
          type: 'simplified';
        };
        kz?: {
          type: 'simplified';
        };
        lt?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        lu?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        lv?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        mt?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        mx?: {
          type: 'simplified';
        };
        my?: {
          type: 'simplified';
        };
        ng?: {
          type: 'simplified';
        };
        nl?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        no?: {
          type: 'standard';
        };
        nz?: {
          type: 'standard';
        };
        om?: {
          type: 'standard';
        };
        pl?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        pt?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        ro?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        sa?: {
          type: 'simplified';
        };
        se?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        sg?: {
          type: 'standard';
        };
        si?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        sk?: {
          standard?: {
            place_of_supply_scheme: 'small_seller' | 'standard';
          };
          type: 'ioss' | 'oss_non_union' | 'oss_union' | 'standard';
        };
        th?: {
          type: 'simplified';
        };
        tr?: {
          type: 'simplified';
        };
        us?: {
          local_amusement_tax?: {
            jurisdiction: string;
          };
          local_lease_tax?: {
            jurisdiction: string;
          };
          state: string;
          state_sales_tax?: {
            elections: {
              jurisdiction?: string;
              type:
                | 'local_use_tax'
                | 'simplified_sellers_use_tax'
                | 'single_local_use_tax';
            }[];
          };
          type:
            | 'local_amusement_tax'
            | 'local_lease_tax'
            | 'state_communications_tax'
            | 'state_sales_tax';
        };
        vn?: {
          type: 'simplified';
        };
        za?: {
          type: 'standard';
        };
      };
      expand?: string[];
      expires_at?: number; // int
    }
  >
>;

export type PostTaxRegistrationsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Registration>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxRegistrationsRequestResult = RequestResult<
  PostTaxRegistrationsRequest,
  PostTaxRegistrationsResponse
>;

export function postTaxRegistrations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxRegistrationsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxRegistrationsRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxRegistrationsEndpointSchema, payload),
    config
  );
}
