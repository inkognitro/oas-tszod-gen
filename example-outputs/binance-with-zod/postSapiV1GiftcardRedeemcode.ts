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

export type PostSapiV1GiftcardRedeemcodeRequest = RequestUnion<
  any,
  any,
  {
    code: string;
    externalUid?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1GiftcardRedeemcodeResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1GiftcardRedeemcodeRequestResult = RequestResult<
  PostSapiV1GiftcardRedeemcodeRequest,
  PostSapiV1GiftcardRedeemcodeResponse
>;

export function postSapiV1GiftcardRedeemcode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1GiftcardRedeemcodeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardRedeemcodeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1GiftcardRedeemcodeEndpointSchema, payload),
    config
  );
}
