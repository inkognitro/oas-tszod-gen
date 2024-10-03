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

export const getSapiV1LendingAutoInvestPlanListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/list',
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

export type GetSapiV1LendingAutoInvestPlanListRequest = RequestUnion<
  any,
  any,
  {
    planType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingAutoInvestPlanListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          planValueInUSD: string;
          planValueInBTC: string;
          pnlInUSD: string;
          roi: string;
          plan: {
            planId: number; // int
            planType: string;
            editAllowed: string;
            creationDateTime: number; // int
            firstExecutionDateTime: number; // int
            nextExecutionDateTime: number; // int
            status: string;
            lastUpdatedDateTime: number; // int
            targetAsset: string;
            totalTargetAmount: string;
            sourceAsset: string;
            totalInvestedInUSD: string;
            subscriptionAmount: string;
            subscriptionCycle: string;
            subscriptionStartDay: string;
            subscriptionStartWeekday: string;
            subscriptionStartTime: string;
            sourceWallet: string;
            flexibleAllowedToUse: string;
            planValueInUSD: string;
            pnlInUSD: string;
            roi: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestPlanListRequestResult = RequestResult<
  GetSapiV1LendingAutoInvestPlanListRequest,
  GetSapiV1LendingAutoInvestPlanListResponse
>;

export function getSapiV1LendingAutoInvestPlanList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestPlanListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestPlanListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LendingAutoInvestPlanListEndpointSchema, payload),
    config
  );
}
