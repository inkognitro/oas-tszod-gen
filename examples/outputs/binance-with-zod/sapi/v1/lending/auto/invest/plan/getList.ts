import {z_Error, Error} from '../../../../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';

export const getListEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/plan/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetListRequest = RequestUnion<
  any,
  any,
  {
    planType: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListResponse =
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

export type GetListRequestResult = RequestResult<
  GetListRequest,
  GetListResponse
>;

export function getList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListRequestResult> {
  return requestHandler.execute(
    createRequest(getListEndpointSchema, payload),
    config
  );
}
