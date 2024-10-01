import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1GiftcardBuycodeEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode',
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
