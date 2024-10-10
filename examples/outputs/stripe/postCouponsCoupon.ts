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
import {Coupon, Error} from './schemas';

export const postCouponsCouponEndpointSchema = {
  path: '/v1/coupons/{coupon}',
  method: 'post',
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
