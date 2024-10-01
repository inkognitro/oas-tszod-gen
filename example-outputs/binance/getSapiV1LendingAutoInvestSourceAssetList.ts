import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1LendingAutoInvestSourceAssetListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/source-asset/list',
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

export type GetSapiV1LendingAutoInvestSourceAssetListPayload = {
  queryParams: {
    targetAsset?: string;
    indexId?: number; // int
    usageType: string;
    flexibleAllowedToUse?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestSourceAssetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          feeRate: string;
          sourceAssets: {
            sourceAsset: string;
            assetMinAmount: string;
            assetMaxAmount: string;
            scale: string;
            flexibleAmount: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestSourceAssetListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestSourceAssetListResponse>;

export function getSapiV1LendingAutoInvestSourceAssetList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestSourceAssetListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestSourceAssetListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestSourceAssetListEndpointSchema,
    }),
    config
  );
}
