import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1GiftcardBuycodeTokenLimitEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode/token-limit',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetSapiV1GiftcardBuycodeTokenLimitRequest = RequestUnion<
  any,
  any,
  {
    baseToken: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1GiftcardBuycodeTokenLimitResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1GiftcardBuycodeTokenLimitRequestResult = RequestResult<
  GetSapiV1GiftcardBuycodeTokenLimitRequest,
  GetSapiV1GiftcardBuycodeTokenLimitResponse
>;

export function getSapiV1GiftcardBuycodeTokenLimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1GiftcardBuycodeTokenLimitRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1GiftcardBuycodeTokenLimitRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1GiftcardBuycodeTokenLimitEndpointSchema, payload),
    config
  );
}
