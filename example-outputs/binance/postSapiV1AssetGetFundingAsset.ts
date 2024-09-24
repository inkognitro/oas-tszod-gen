import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1AssetGetFundingAssetEndpointSchema = {
  path: '/sapi/v1/asset/get-funding-asset',
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

export type PostSapiV1AssetGetFundingAssetPayload = {
  queryParams: {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetGetFundingAssetResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AssetGetFundingAssetRequestResult = RequestResult<
  Request,
  PostSapiV1AssetGetFundingAssetResponse
>;

export function postSapiV1AssetGetFundingAsset(
  requestHandler: RequestHandler,
  payload: PostSapiV1AssetGetFundingAssetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetGetFundingAssetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetGetFundingAssetEndpointSchema,
    }),
    config
  );
}
