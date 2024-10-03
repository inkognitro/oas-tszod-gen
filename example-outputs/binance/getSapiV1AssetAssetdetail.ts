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

export const getSapiV1AssetAssetdetailEndpointSchema = {
  path: '/sapi/v1/asset/assetDetail',
  method: 'get',
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

export type GetSapiV1AssetAssetdetailRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetAssetdetailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          CTR: {
            minWithdrawAmount: string;
            depositStatus: boolean;
            withdrawFee: number; // int
            withdrawStatus: boolean;
            depositTip: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetAssetdetailRequestResult = RequestResult<
  GetSapiV1AssetAssetdetailRequest,
  GetSapiV1AssetAssetdetailResponse
>;

export function getSapiV1AssetAssetdetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetAssetdetailRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetAssetdetailRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetAssetdetailEndpointSchema, payload),
    config
  );
}
