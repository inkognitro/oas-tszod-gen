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

export const postSapiV1GiftcardCreatecodeEndpointSchema = {
  path: '/sapi/v1/giftcard/createCode',
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

export type PostSapiV1GiftcardCreatecodeRequest = RequestUnion<
  any,
  any,
  {
    token: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1GiftcardCreatecodeResponse =
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

export type PostSapiV1GiftcardCreatecodeRequestResult = RequestResult<
  PostSapiV1GiftcardCreatecodeRequest,
  PostSapiV1GiftcardCreatecodeResponse
>;

export function postSapiV1GiftcardCreatecode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1GiftcardCreatecodeRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1GiftcardCreatecodeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1GiftcardCreatecodeEndpointSchema, payload),
    config
  );
}
