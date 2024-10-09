import {
  z_Coupon,
  z_Error,
  Coupon,
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

export const postCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    coupon: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        currency_options: z
          .record(
            z.object({
              amount_off: z.number().int().safe().finite(),
            })
          )
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
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

export type PostCouponsCouponRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      currency_options?: {
        [key: string]: {
          amount_off: number; // int
        };
      };
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
    }
  >,
  {
    coupon: string;
  }
>;

export type PostCouponsCouponResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Coupon>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCouponsCouponRequestResult = RequestResult<
  PostCouponsCouponRequest,
  PostCouponsCouponResponse
>;

export function postCouponsCoupon(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCouponsCouponRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCouponsCouponRequestResult> {
  return requestHandler.execute(
    createRequest(postCouponsCouponEndpointSchema, payload),
    config
  );
}
