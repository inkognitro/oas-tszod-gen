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

export const postSapiV1AssetConvertTransferEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer',
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

export type PostSapiV1AssetConvertTransferPayload = {
  queryParams: {
    clientTranId: string;
    asset: string;
    amount: number;
    targetAsset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetConvertTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetConvertTransferRequestResult = RequestResult<
  Request,
  PostSapiV1AssetConvertTransferResponse
>;

export function postSapiV1AssetConvertTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AssetConvertTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetConvertTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetConvertTransferEndpointSchema,
    }),
    config
  );
}
