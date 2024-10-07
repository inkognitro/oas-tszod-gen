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

export const postSapiV1AssetDustBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
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

export type PostSapiV1AssetDustBtcRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetDustBtcResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          details: {
            asset: string;
            assetFullName: string;
            amountFree: string;
            toBTC: string;
            toBNB: string;
            toBNBOffExchange: string;
            exchange: string;
          }[];
          totalTransferBtc: string;
          totalTransferBNB: string;
          dribbletPercentage: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetDustBtcRequestResult = RequestResult<
  PostSapiV1AssetDustBtcRequest,
  PostSapiV1AssetDustBtcResponse
>;

export function postSapiV1AssetDustBtc(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetDustBtcRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustBtcRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetDustBtcEndpointSchema, payload),
    config
  );
}
