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

export const getSapiV1LendingAutoInvestPlanListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/list',
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

export type GetSapiV1LendingAutoInvestPlanListPayload = {
  queryParams: {
    planType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestPlanListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LendingAutoInvestPlanListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestPlanListResponse
>;

export function getSapiV1LendingAutoInvestPlanList(
  requestHandler: RequestHandler,
  payload: GetSapiV1LendingAutoInvestPlanListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestPlanListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestPlanListEndpointSchema,
    }),
    config
  );
}
