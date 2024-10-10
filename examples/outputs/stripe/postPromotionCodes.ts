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
import {Promotion_code, Error} from './schemas';

export const postPromotionCodesEndpointSchema = {
  path: '/v1/promotion_codes',
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
