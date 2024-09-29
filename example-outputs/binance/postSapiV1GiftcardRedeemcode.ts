import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1GiftcardRedeemcodeEndpointSchema = {
  path: '/sapi/v1/giftcard/redeemCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
