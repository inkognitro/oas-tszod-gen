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

export const getSapiV1LendingAutoInvestIndexUserSummaryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/index/user-summary',
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

export type GetSapiV1LendingAutoInvestIndexUserSummaryRequest = RequestUnion<
  any,
  any,
  {
    indexId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingAutoInvestIndexUserSummaryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          indexId: number; // int
          totalInvestedInUSD: string;
          currentInvestedInUSD: string;
          pnlInUSD: string;
          roi: string;
          assetAllocation: {
            targetAsset: string;
            allocation: string;
          }[];
          details: {
            targetAsset: string;
            averagePriceInUSD: string;
            totalInvestedInUSD: string;
            currentInvestedInUSD: string;
            purchasedAmount: string;
            pnlInUSD: string;
            roi: string;
            percentage: string;
            availableAmount: string;
            redeemedAmount: string;
            assetValueInUSD: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestIndexUserSummaryRequestResult =
  RequestResult<
    GetSapiV1LendingAutoInvestIndexUserSummaryRequest,
    GetSapiV1LendingAutoInvestIndexUserSummaryResponse
  >;

export function getSapiV1LendingAutoInvestIndexUserSummary(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestIndexUserSummaryRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestIndexUserSummaryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1LendingAutoInvestIndexUserSummaryEndpointSchema,
      payload
    ),
    config
  );
}
