import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1LendingAutoInvestPlanListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    planType: z.string(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            planValueInUSD: z.string(),
            planValueInBTC: z.string(),
            pnlInUSD: z.string(),
            roi: z.string(),
            plan: z.array(
              z.object({
                planId: z.number().int().safe().finite(),
                planType: z.string(),
                editAllowed: z.string(),
                creationDateTime: z.number().int().safe().finite(),
                firstExecutionDateTime: z.number().int().safe().finite(),
                nextExecutionDateTime: z.number().int().safe().finite(),
                status: z.string(),
                lastUpdatedDateTime: z.number().int().safe().finite(),
                targetAsset: z.string(),
                totalTargetAmount: z.string(),
                sourceAsset: z.string(),
                totalInvestedInUSD: z.string(),
                subscriptionAmount: z.string(),
                subscriptionCycle: z.string(),
                subscriptionStartDay: z.string(),
                subscriptionStartWeekday: z.string(),
                subscriptionStartTime: z.string(),
                sourceWallet: z.string(),
                flexibleAllowedToUse: z.string(),
                planValueInUSD: z.string(),
                pnlInUSD: z.string(),
                roi: z.string(),
              })
            ),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestPlanListRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestPlanListResponse
>;

export function getSapiV1LendingAutoInvestPlanList(
  requestHandler: SimpleRequestHandler,
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
