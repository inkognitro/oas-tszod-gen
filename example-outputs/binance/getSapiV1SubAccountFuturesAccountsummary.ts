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

export const getSapiV1SubAccountFuturesAccountsummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/accountSummary',
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

export type GetSapiV1SubAccountFuturesAccountsummaryPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountFuturesAccountsummaryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalInitialMargin: string;
          totalMaintenanceMargin: string;
          totalMarginBalance: string;
          totalOpenOrderInitialMargin: string;
          totalPositionInitialMargin: string;
          totalUnrealizedProfit: string;
          totalWalletBalance: string;
          asset: string;
          subAccountList: {
            email: string;
            totalInitialMargin: string;
            totalMaintenanceMargin: string;
            totalMarginBalance: string;
            totalOpenOrderInitialMargin: string;
            totalPositionInitialMargin: string;
            totalUnrealizedProfit: string;
            totalWalletBalance: string;
            asset: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountFuturesAccountsummaryRequestResult =
  RequestResult<Request, GetSapiV1SubAccountFuturesAccountsummaryResponse>;

export function getSapiV1SubAccountFuturesAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountFuturesAccountsummaryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountFuturesAccountsummaryEndpointSchema,
    }),
    config
  );
}
