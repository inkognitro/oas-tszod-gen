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

export const getSapiV1LendingAutoInvestHistoryListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/history/list',
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

export type GetSapiV1LendingAutoInvestHistoryListPayload = {
  queryParams: {
    planId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    targetAsset?: number;
    planType?: 'SINGLE' | 'PORTFOLIO' | 'INDEX' | 'ALL';
    size?: number; // int
    current?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestHistoryListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          targetAsset: string;
          planType: string;
          planName: string;
          planId: number; // int
          transactionDateTime: number; // int
          transactionStatus: string;
          failedType: string;
          sourceAsset: string;
          sourceAssetAmount: string;
          targetAssetAmount: string;
          sourceWallet: string;
          flexibleUsed: string;
          transactionFee: string;
          transactionFeeUnit: string;
          executionPrice: string;
          executionType: string;
          subscriptionCycle: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestHistoryListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestHistoryListResponse
>;

export function getSapiV1LendingAutoInvestHistoryList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestHistoryListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestHistoryListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestHistoryListEndpointSchema,
    }),
    config
  );
}
