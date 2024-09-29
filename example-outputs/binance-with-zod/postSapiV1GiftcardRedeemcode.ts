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

export const postSapiV1GiftcardRedeemcodeEndpointSchema = {
  path: '/sapi/v1/giftcard/redeemCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    code: z.string(),
    externalUid: z.string().optional(),
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
              token: z.string(),
              amount: z.string(),
              referenceNo: z.string(),
              identityNo: z.string(),
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

export type PostSapiV1GiftcardRedeemcodePayload = {
  queryParams: {
    code: string;
    externalUid?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1GiftcardRedeemcodeResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            token: string;
            amount: string;
            referenceNo: string;
            identityNo: string;
          };
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1GiftcardRedeemcodeRequestResult = RequestResult<
  Request,
  PostSapiV1GiftcardRedeemcodeResponse
>;

export function postSapiV1GiftcardRedeemcode(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1GiftcardRedeemcodePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardRedeemcodeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1GiftcardRedeemcodeEndpointSchema,
    }),
    config
  );
}
