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

export const postCouponsEndpointSchema = {
  path: '/v1/coupons',
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
