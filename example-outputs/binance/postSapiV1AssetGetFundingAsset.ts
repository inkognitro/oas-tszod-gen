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

export const postSapiV1AssetGetFundingAssetEndpointSchema = {
  path: '/sapi/v1/asset/get-funding-asset',
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

export type PostSapiV1AssetGetFundingAssetRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetGetFundingAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          free: string;
          locked: string;
          freeze: string;
          withdrawing: string;
          btcValuation: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetGetFundingAssetRequestResult = RequestResult<
  PostSapiV1AssetGetFundingAssetRequest,
  PostSapiV1AssetGetFundingAssetResponse
>;

export function postSapiV1AssetGetFundingAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetGetFundingAssetRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetGetFundingAssetRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetGetFundingAssetEndpointSchema, payload),
    config
  );
}
