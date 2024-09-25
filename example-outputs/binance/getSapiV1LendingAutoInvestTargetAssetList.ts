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

export const getSapiV1LendingAutoInvestTargetAssetListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/list',
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

export type GetSapiV1LendingAutoInvestTargetAssetListPayload = {
  queryParams: {
    targetAsset?: string;
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestTargetAssetListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestTargetAssetListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestTargetAssetListResponse>;

export function getSapiV1LendingAutoInvestTargetAssetList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestTargetAssetListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestTargetAssetListEndpointSchema,
    }),
    config
  );
}
