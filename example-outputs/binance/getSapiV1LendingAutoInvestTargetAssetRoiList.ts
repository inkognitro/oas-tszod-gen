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

export const getSapiV1LendingAutoInvestTargetAssetRoiListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/target-asset/roi/list',
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
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            date: string;
            simulateRoi: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestTargetAssetRoiListRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestTargetAssetRoiListResponse>;

export function getSapiV1LendingAutoInvestTargetAssetRoiList(
  requestHandler: RequestHandler,
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
