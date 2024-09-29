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

export const getSapiV1SubAccountTransactionStatisticsEndpointSchema = {
  path: '/sapi/v1/sub-account/transaction-statistics',
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

export type GetSapiV1SubAccountTransactionStatisticsPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountTransactionStatisticsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          recent30BtcTotal: string;
          recent30BtcFuturesTotal: string;
          recent30BtcMarginTotal: string;
          recent30BusdTotal: string;
          recent30BusdFuturesTotal: string;
          recent30BusdMarginTotal: string;
          tradeInfoVos: {
            userId?: number; // int
            btc?: number;
            btcFutures?: number;
            btcMargin?: number;
            busd?: number;
            busdFutures?: number;
            busdMargin?: number;
            date?: number; // int
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountTransactionStatisticsRequestResult =
  RequestResult<Request, GetSapiV1SubAccountTransactionStatisticsResponse>;

export function getSapiV1SubAccountTransactionStatistics(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountTransactionStatisticsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountTransactionStatisticsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountTransactionStatisticsEndpointSchema,
    }),
    config
  );
}
