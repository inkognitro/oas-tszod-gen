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

export const postSapiV1GiftcardCreatecodeEndpointSchema = {
  path: '/sapi/v1/giftcard/createCode',
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

export type PostSapiV1GiftcardCreatecodePayload = {
  queryParams: {
    token: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1GiftcardCreatecodeResponse =
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

export type PostSapiV1GiftcardCreatecodeRequestResult = RequestResult<
  Request,
  PostSapiV1GiftcardCreatecodeResponse
>;

export function postSapiV1GiftcardCreatecode(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1GiftcardCreatecodePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardCreatecodeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1GiftcardCreatecodeEndpointSchema,
    }),
    config
  );
}
