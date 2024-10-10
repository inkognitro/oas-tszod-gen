import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getAccountEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            email: z.string(),
            asset: z.string(),
            assets: z.array(
              z.object({
                asset: z.string(),
                initialMargin: z.string(),
                maintenanceMargin: z.string(),
                marginBalance: z.string(),
                maxWithdrawAmount: z.string(),
                openOrderInitialMargin: z.string(),
                positionInitialMargin: z.string(),
                unrealizedProfit: z.string(),
                walletBalance: z.string(),
              })
            ),
            canDeposit: z.boolean(),
            canTrade: z.boolean(),
            canWithdraw: z.boolean(),
            feeTier: z.number().int().safe().finite(),
            maxWithdrawAmount: z.string(),
            totalInitialMargin: z.string(),
            totalMaintenanceMargin: z.string(),
            totalMarginBalance: z.string(),
            totalOpenOrderInitialMargin: z.string(),
            totalPositionInitialMargin: z.string(),
            totalUnrealizedProfit: z.string(),
            totalWalletBalance: z.string(),
            updateTime: z.number().int().safe().finite(),
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

export type GetAccountRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          asset: string;
          assets: {
            asset: string;
            initialMargin: string;
            maintenanceMargin: string;
            marginBalance: string;
            maxWithdrawAmount: string;
            openOrderInitialMargin: string;
            positionInitialMargin: string;
            unrealizedProfit: string;
            walletBalance: string;
          }[];
          canDeposit: boolean;
          canTrade: boolean;
          canWithdraw: boolean;
          feeTier: number; // int
          maxWithdrawAmount: string;
          totalInitialMargin: string;
          totalMaintenanceMargin: string;
          totalMarginBalance: string;
          totalOpenOrderInitialMargin: string;
          totalPositionInitialMargin: string;
          totalUnrealizedProfit: string;
          totalWalletBalance: string;
          updateTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountRequestResult = RequestResult<
  GetAccountRequest,
  GetAccountResponse
>;

export function getAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountEndpointSchema, payload),
    config
  );
}
