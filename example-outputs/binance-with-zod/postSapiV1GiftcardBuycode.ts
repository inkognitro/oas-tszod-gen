import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV1GiftcardBuycodeEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    baseToken: z.string(),
    faceToken: z.string(),
    baseTokenAmount: z.number().safe().finite(),
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
              referenceNo: z.string(),
              code: z.string(),
              expiredTime: z.number().int().safe().finite(),
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

export type PostSapiV1GiftcardBuycodeRequest = RequestUnion<
  any,
  any,
  {
    baseToken: string;
    faceToken: string;
    baseTokenAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1GiftcardBuycodeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            referenceNo: string;
            code: string;
            expiredTime: number; // int
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1GiftcardBuycodeRequestResult = RequestResult<
  PostSapiV1GiftcardBuycodeRequest,
  PostSapiV1GiftcardBuycodeResponse
>;

export function postSapiV1GiftcardBuycode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1GiftcardBuycodeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardBuycodeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1GiftcardBuycodeEndpointSchema, payload),
    config
  );
}
