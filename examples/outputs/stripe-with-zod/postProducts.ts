import {z_Product, z_Error, Product, Error} from './schemas';
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

export const postProductsEndpointSchema = {
  path: '/v1/products',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        default_price_data: z
          .object({
            currency: z.string(),
            currency_options: z
              .record(
                z.object({
                  custom_unit_amount: z
                    .object({
                      enabled: z.boolean(),
                      maximum: z.number().int().safe().finite().optional(),
                      minimum: z.number().int().safe().finite().optional(),
                      preset: z.number().int().safe().finite().optional(),
                    })
                    .optional(),
                  tax_behavior: z
                    .enum(['exclusive', 'inclusive', 'unspecified'])
                    .optional(),
                  tiers: z
                    .array(
                      z.object({
                        flat_amount: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
                        flat_amount_decimal: z.string().optional(),
                        unit_amount: z
                          .number()
                          .int()
                          .safe()
                          .finite()
                          .optional(),
                        unit_amount_decimal: z.string().optional(),
                        up_to: z.union([
                          z.enum(['inf']),
                          z.number().int().safe().finite(),
                        ]),
                      })
                    )
                    .optional(),
                  unit_amount: z.number().int().safe().finite().optional(),
                  unit_amount_decimal: z.string().optional(),
                })
              )
              .optional(),
            recurring: z
              .object({
                interval: z.enum(['day', 'month', 'week', 'year']),
                interval_count: z.number().int().safe().finite().optional(),
              })
              .optional(),
            tax_behavior: z
              .enum(['exclusive', 'inclusive', 'unspecified'])
              .optional(),
            unit_amount: z.number().int().safe().finite().optional(),
            unit_amount_decimal: z.string().optional(),
          })
          .optional(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        id: z.string().optional(),
        images: z.array(z.string()).optional(),
        marketing_features: z
          .array(
            z.object({
              name: z.string(),
            })
          )
          .optional(),
        metadata: z.record(z.string()).optional(),
        name: z.string(),
        package_dimensions: z
          .object({
            height: z.number().safe().finite(),
            length: z.number().safe().finite(),
            weight: z.number().safe().finite(),
            width: z.number().safe().finite(),
          })
          .optional(),
        shippable: z.boolean().optional(),
        statement_descriptor: z.string().optional(),
        tax_code: z.string().optional(),
        unit_label: z.string().optional(),
        url: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Product,
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

export type PostProductsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      default_price_data?: {
        currency: string;
        currency_options?: {
          [key: string]: {
            custom_unit_amount?: {
              enabled: boolean;
              maximum?: number; // int
              minimum?: number; // int
              preset?: number; // int
            };
            tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
            tiers?: {
              flat_amount?: number; // int
              flat_amount_decimal?: string; // decimal
              unit_amount?: number; // int
              unit_amount_decimal?: string; // decimal
              up_to: 'inf' | number;
            }[];
            unit_amount?: number; // int
            unit_amount_decimal?: string; // decimal
          };
        };
        recurring?: {
          interval: 'day' | 'month' | 'week' | 'year';
          interval_count?: number; // int
        };
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      description?: string;
      expand?: string[];
      id?: string;
      images?: string[];
      marketing_features?: {
        name: string;
      }[];
      metadata?: {
        [key: string]: string;
      };
      name: string;
      package_dimensions?: {
        height: number;
        length: number;
        weight: number;
        width: number;
      };
      shippable?: boolean;
      statement_descriptor?: string;
      tax_code?: string;
      unit_label?: string;
      url?: string;
    }
  >
>;

export type PostProductsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostProductsRequestResult = RequestResult<
  PostProductsRequest,
  PostProductsResponse
>;

export function postProducts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostProductsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostProductsRequestResult> {
  return requestHandler.execute(
    createRequest(postProductsEndpointSchema, payload),
    config
  );
}
