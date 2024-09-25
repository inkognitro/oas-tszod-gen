import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1GiftcardBuycodeEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
