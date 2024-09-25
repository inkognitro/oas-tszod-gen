import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1LendingAutoInvestSourceAssetListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/source-asset/list',
  method: 'get',
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
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
