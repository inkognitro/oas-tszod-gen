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

export const getSapiV1LendingAutoInvestPlanIdEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/id',
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

export type GetSapiV1LendingAutoInvestPlanIdPayload = {
  queryParams: {
    planId?: number; // int
    requestId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestPlanIdResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          planValueInUSD?: string;
          planValueInBTC?: string;
          pnlInUSD?: string;
          roi?: string;
          plan?: {
            planId: number; // int
            planType: string;
            editAllowed: string;
            flexibleAllowedToUse: string;
            creationDateTime: number; // int
            firstExecutionDateTime: number; // int
            nextExecutionDateTime: number; // int
            status: string;
            targetAsset: string;
            sourceAsset: string;
            totalInvestedInUSD: string;
            planValueInUSD: string;
            pnlInUSD: string;
            roi: string;
            details: {
              targetAsset: string;
              averagePriceInUSD: string;
              totalInvestedInUSD: string;
              purchasedAmount: string;
              purchasedAmountUnit: string;
              pnlInUSD: string;
              roi: string;
              percentage: string;
              assetStatus: string;
              availableAmount: string;
              availableAmountUnit: string;
              redeemedAmout: string;
              redeemedAmoutUnit: string;
              assetValueInUSD: string;
            }[];
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestPlanIdRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestPlanIdResponse
>;

export function getSapiV1LendingAutoInvestPlanId(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestPlanIdPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestPlanIdRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestPlanIdEndpointSchema,
    }),
    config
  );
}
