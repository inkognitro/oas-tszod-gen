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

export const postSapiV1SubAccountFuturesTransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/transfer',
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

export type PostSapiV1SubAccountFuturesTransferRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    asset: string;
    amount: number;
    type: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountFuturesTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountFuturesTransferRequestResult = RequestResult<
  PostSapiV1SubAccountFuturesTransferRequest,
  PostSapiV1SubAccountFuturesTransferResponse
>;

export function postSapiV1SubAccountFuturesTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountFuturesTransferRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountFuturesTransferEndpointSchema, payload),
    config
  );
}
