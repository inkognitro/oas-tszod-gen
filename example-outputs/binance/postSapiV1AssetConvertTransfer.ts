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

export type PostSapiV1AssetConvertTransferRequest = RequestUnion<
  any,
  any,
  {
    clientTranId: string;
    asset: string;
    amount: number;
    targetAsset: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetConvertTransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetConvertTransferRequestResult = RequestResult<
  PostSapiV1AssetConvertTransferRequest,
  PostSapiV1AssetConvertTransferResponse
>;

export function postSapiV1AssetConvertTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetConvertTransferRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetConvertTransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetConvertTransferEndpointSchema, payload),
    config
  );
}
