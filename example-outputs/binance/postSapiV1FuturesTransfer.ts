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

export const postSapiV1FuturesTransferEndpointSchema = {
  path: '/sapi/v1/futures/transfer',
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

export type PostSapiV1FuturesTransferPayload = {
  queryParams: {
    asset: string;
    amount: number;
    type: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1FuturesTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1FuturesTransferRequestResult = RequestResult<
  Request,
  PostSapiV1FuturesTransferResponse
>;

export function postSapiV1FuturesTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1FuturesTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1FuturesTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1FuturesTransferEndpointSchema,
    }),
    config
  );
}
