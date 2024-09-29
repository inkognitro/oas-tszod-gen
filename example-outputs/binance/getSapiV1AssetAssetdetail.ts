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

export type GetSapiV1AssetAssetdetailPayload = {
  queryParams: {
    asset?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetAssetdetailResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetAssetdetailRequestResult = RequestResult<
  Request,
  GetSapiV1AssetAssetdetailResponse
>;

export function getSapiV1AssetAssetdetail(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetAssetdetailPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetAssetdetailRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetAssetdetailEndpointSchema,
    }),
    config
  );
}
