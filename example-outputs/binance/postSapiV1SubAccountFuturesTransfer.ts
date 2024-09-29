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

export const postSapiV1SubAccountFuturesTransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/transfer',
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

export type PostSapiV1SubAccountFuturesTransferPayload = {
  queryParams: {
    email: string;
    asset: string;
    amount: number;
    type: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountFuturesTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountFuturesTransferRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountFuturesTransferResponse
>;

export function postSapiV1SubAccountFuturesTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountFuturesTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountFuturesTransferEndpointSchema,
    }),
    config
  );
}
