import {
  z_Promotion_code,
  z_Error,
  Promotion_code,
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

export const postPromotionCodesEndpointSchema = {
  path: '/v1/promotion_codes',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        active: z.boolean().optional(),
        code: z.string().optional(),
        coupon: z.string(),
        customer: z.string().optional(),
        expand: z.array(z.string()).optional(),
        expires_at: z.number().int().safe().finite().optional(),
        max_redemptions: z.number().int().safe().finite().optional(),
        metadata: z.record(z.string()).optional(),
        restrictions: z
          .object({
            currency_options: z
              .record(
                z.object({
                  minimum_amount: z.number().int().safe().finite().optional(),
                })
              )
              .optional(),
            first_time_transaction: z.boolean().optional(),
            minimum_amount: z.number().int().safe().finite().optional(),
            minimum_amount_currency: z.string().optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Promotion_code,
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

export type PostPromotionCodesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      code?: string;
      coupon: string;
      customer?: string;
      expand?: string[];
      expires_at?: number; // int
      max_redemptions?: number; // int
      metadata?: {
        [key: string]: string;
      };
      restrictions?: {
        currency_options?: {
          [key: string]: {
            minimum_amount?: number; // int
          };
        };
        first_time_transaction?: boolean;
        minimum_amount?: number; // int
        minimum_amount_currency?: string;
      };
    }
  >
>;

export type PostPromotionCodesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Promotion_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPromotionCodesRequestResult = RequestResult<
  PostPromotionCodesRequest,
  PostPromotionCodesResponse
>;

export function postPromotionCodes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPromotionCodesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPromotionCodesRequestResult> {
  return requestHandler.execute(
    createRequest(postPromotionCodesEndpointSchema, payload),
    config
  );
}
