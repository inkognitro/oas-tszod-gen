import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1GiftcardBuycodeTokenLimitEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode/token-limit',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    baseToken: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            code: z.string(),
            message: z.string(),
            data: z.object({
              coin: z.string().optional(),
              fromMin: z.string().optional(),
              fromMax: z.string().optional(),
            }),
            success: z.boolean(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1GiftcardBuycodeTokenLimitPayload = {
  queryParams: {
    baseToken: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1GiftcardBuycodeTokenLimitResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            code: string;
            message: string;
            data: {
              coin?: string;
              fromMin?: string;
              fromMax?: string;
            };
            success: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1GiftcardBuycodeTokenLimitRequestResult = RequestResult<
  Request,
  GetSapiV1GiftcardBuycodeTokenLimitResponse
>;

export function getSapiV1GiftcardBuycodeTokenLimit(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1GiftcardBuycodeTokenLimitPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardBuycodeTokenLimitRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1GiftcardBuycodeTokenLimitEndpointSchema,
    }),
    config
  );
}
