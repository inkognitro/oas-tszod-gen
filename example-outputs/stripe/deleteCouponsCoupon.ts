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
import {Deleted_coupon, Error} from '@example-outputs/stripe';

export const deleteCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
  method: 'delete',
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

export type DeleteCouponsCouponRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    coupon: string;
  }
>;

export type DeleteCouponsCouponResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_coupon>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCouponsCouponRequestResult = RequestResult<
  DeleteCouponsCouponRequest,
  DeleteCouponsCouponResponse
>;

export function deleteCouponsCoupon(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCouponsCouponRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCouponsCouponRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCouponsCouponEndpointSchema, payload),
    config
  );
}
