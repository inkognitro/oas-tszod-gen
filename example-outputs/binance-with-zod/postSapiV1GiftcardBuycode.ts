import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type PostSapiV1GiftcardBuycodePayload = {
  queryParams: {
    baseToken: string;
    faceToken: string;
    baseTokenAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1GiftcardBuycodeResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1GiftcardBuycodeRequestResult = RequestResult<
  Request,
  PostSapiV1GiftcardBuycodeResponse
>;

export function postSapiV1GiftcardBuycode(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1GiftcardBuycodePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardBuycodeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1GiftcardBuycodeEndpointSchema,
    }),
    config
  );
}
