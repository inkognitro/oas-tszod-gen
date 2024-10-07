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

export const getSapiV1LendingAutoInvestTargetAssetListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/list',
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

export type GetSapiV1LendingAutoInvestTargetAssetListRequest = RequestUnion<
  any,
  any,
  {
    targetAsset?: string;
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingAutoInvestTargetAssetListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          targetAssets?: string;
          autoInvestAssetList?: {
            targetAsset: string;
            roiAndDimensionTypeList: {
              simulateRoi: string;
              dimensionValue: string;
              dimensionUnit: string;
            }[];
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestTargetAssetListRequestResult =
  RequestResult<
    GetSapiV1LendingAutoInvestTargetAssetListRequest,
    GetSapiV1LendingAutoInvestTargetAssetListResponse
  >;

export function getSapiV1LendingAutoInvestTargetAssetList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestTargetAssetListRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetListRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1LendingAutoInvestTargetAssetListEndpointSchema,
      payload
    ),
    config
  );
}
