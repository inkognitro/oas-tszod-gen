import {
  z_Promotion_code,
  z_Error,
  Promotion_code,
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

export const getPromotionCodesPromotionCodeEndpointSchema = {
  path: '/v1/promotion_codes/{promotion_code}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    promotion_code: z.string(),
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
          zodSchema: z_Promotion_code,
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
