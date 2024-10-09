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
} from '@example-outputs/stripe/core';
import {Coupon, Error} from '@example-outputs/stripe';

export const getCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
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
