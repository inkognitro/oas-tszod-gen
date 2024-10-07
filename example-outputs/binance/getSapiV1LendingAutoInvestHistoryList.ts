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

export const getSapiV1LendingAutoInvestHistoryListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/history/list',
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

export type GetSapiV1LendingAutoInvestHistoryListRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1LendingAutoInvestHistoryListResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestHistoryListRequestResult = RequestResult<
  GetSapiV1LendingAutoInvestHistoryListRequest,
  GetSapiV1LendingAutoInvestHistoryListResponse
>;

export function getSapiV1LendingAutoInvestHistoryList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestHistoryListRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestHistoryListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LendingAutoInvestHistoryListEndpointSchema, payload),
    config
  );
}
