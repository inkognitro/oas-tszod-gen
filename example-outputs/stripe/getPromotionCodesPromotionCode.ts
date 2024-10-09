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
import {Promotion_code, Error} from '@example-outputs/stripe';

export const getPromotionCodesPromotionCodeEndpointSchema = {
  path: '/v1/promotion_codes/{promotion_code}',
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

export type GetPromotionCodesPromotionCodeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    promotion_code: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPromotionCodesPromotionCodeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Promotion_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPromotionCodesPromotionCodeRequestResult = RequestResult<
  GetPromotionCodesPromotionCodeRequest,
  GetPromotionCodesPromotionCodeResponse
>;

export function getPromotionCodesPromotionCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPromotionCodesPromotionCodeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPromotionCodesPromotionCodeRequestResult> {
  return requestHandler.execute(
    createRequest(getPromotionCodesPromotionCodeEndpointSchema, payload),
    config
  );
}
