import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

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
  payload: RequestPayload<
    PostSapiV1GiftcardRedeemcodeRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardRedeemcodeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1GiftcardRedeemcodeEndpointSchema, payload),
    config
  );
}
