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

export const getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/roi/list',
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

export type GetSapiV1LendingAutoInvestTargetAssetRoiListPayload = {
  queryParams: {
    targetAsset: string;
    hisRoiType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestTargetAssetRoiListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          date: string;
          simulateRoi: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestTargetAssetRoiListResponse>;

export function getSapiV1LendingAutoInvestTargetAssetRoiList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestTargetAssetRoiListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema,
    }),
    config
  );
}
