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

export const postPromotionCodesPromotionCodeEndpointSchema = {
  path: '/v1/promotion_codes/{promotion_code}',
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

export type PostPromotionCodesPromotionCodeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      active?: boolean;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      restrictions?: {
        currency_options?: {
          [key: string]: {
            minimum_amount?: number; // int
          };
        };
      };
    }
  >,
  {
    promotion_code: string;
  }
>;

export type PostPromotionCodesPromotionCodeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Promotion_code>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPromotionCodesPromotionCodeRequestResult = RequestResult<
  PostPromotionCodesPromotionCodeRequest,
  PostPromotionCodesPromotionCodeResponse
>;

export function postPromotionCodesPromotionCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPromotionCodesPromotionCodeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPromotionCodesPromotionCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postPromotionCodesPromotionCodeEndpointSchema, payload),
    config
  );
}
