import {z_Price, z_Error, Price, Error} from '@example-outputs/stripe-with-zod';
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

export const postPricesPriceEndpointSchema = {
  path: '/v1/prices/{price}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    price: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        currency_options: z
          .union([
            z.record(
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
                      flat_amount: z.number().int().safe().finite().optional(),
                      flat_amount_decimal: z.string().optional(),
                      unit_amount: z.number().int().safe().finite().optional(),
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
            ),
            z.enum(['']),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        lookup_key: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        nickname: z.string().optional(),
        tax_behavior: z
          .enum(['exclusive', 'inclusive', 'unspecified'])
          .optional(),
        transfer_lookup_key: z.boolean().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Price,
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

export type PostPricesPriceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      currency_options?:
        | {
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
          }
        | '';
      expand?: string[];
      lookup_key?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      nickname?: string;
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      transfer_lookup_key?: boolean;
    }
  >,
  {
    price: string;
  }
>;

export type PostPricesPriceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Price>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPricesPriceRequestResult = RequestResult<
  PostPricesPriceRequest,
  PostPricesPriceResponse
>;

export function postPricesPrice(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPricesPriceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPricesPriceRequestResult> {
  return requestHandler.execute(
    createRequest(postPricesPriceEndpointSchema, payload),
    config
  );
}
