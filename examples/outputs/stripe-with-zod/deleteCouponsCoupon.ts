import {z_Deleted_coupon, z_Error, Deleted_coupon, Error} from './schemas';
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

export const deleteCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_coupon,
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
