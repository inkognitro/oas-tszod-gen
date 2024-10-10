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

export const getCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    coupon: z.string(),
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

export type GetCouponsCouponRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    coupon: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCouponsCouponResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Coupon>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCouponsCouponRequestResult = RequestResult<
  GetCouponsCouponRequest,
  GetCouponsCouponResponse
>;

export function getCouponsCoupon(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCouponsCouponRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCouponsCouponRequestResult> {
  return requestHandler.execute(
    createRequest(getCouponsCouponEndpointSchema, payload),
    config
  );
}
