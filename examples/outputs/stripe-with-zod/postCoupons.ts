import {z_Coupon, z_Error, Coupon, Error} from './schemas';
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

export const postCouponsEndpointSchema = {
  path: '/v1/coupons',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount_off: z.number().int().safe().finite().optional(),
        applies_to: z
          .object({
            products: z.array(z.string()).optional(),
          })
          .optional(),
        currency: z.string().optional(),
        currency_options: z
          .record(
            z.object({
              amount_off: z.number().int().safe().finite(),
            })
          )
          .optional(),
        duration: z.enum(['forever', 'once', 'repeating']).optional(),
        duration_in_months: z.number().int().safe().finite().optional(),
        expand: z.array(z.string()).optional(),
        id: z.string().optional(),
        max_redemptions: z.number().int().safe().finite().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
        percent_off: z.number().safe().finite().optional(),
        redeem_by: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Coupon,
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

export type PostCouponsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount_off?: number; // int
      applies_to?: {
        products?: string[];
      };
      currency?: string;
      currency_options?: {
        [key: string]: {
          amount_off: number; // int
        };
      };
      duration?: 'forever' | 'once' | 'repeating';
      duration_in_months?: number; // int
      expand?: string[];
      id?: string;
      max_redemptions?: number; // int
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
      percent_off?: number;
      redeem_by?: number; // int
    }
  >
>;

export type PostCouponsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Coupon>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCouponsRequestResult = RequestResult<
  PostCouponsRequest,
  PostCouponsResponse
>;

export function postCoupons(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCouponsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCouponsRequestResult> {
  return requestHandler.execute(
    createRequest(postCouponsEndpointSchema, payload),
    config
  );
}
