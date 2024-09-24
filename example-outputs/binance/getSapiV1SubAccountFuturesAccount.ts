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

export const getSapiV1SubAccountFuturesAccountEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/account',
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

export type GetSapiV1SubAccountFuturesAccountPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountFuturesAccountResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountFuturesAccountRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountFuturesAccountResponse
>;

export function getSapiV1SubAccountFuturesAccount(
  requestHandler: RequestHandler,
  payload: GetSapiV1SubAccountFuturesAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountFuturesAccountEndpointSchema,
    }),
    config
  );
}
