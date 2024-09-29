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

export const getSapiV1MiningStatisticsUserStatusEndpointSchema = {
  path: '/sapi/v1/mining/statistics/user/status',
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

export type GetSapiV1MiningStatisticsUserStatusPayload = {
  queryParams: {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MiningStatisticsUserStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            fifteenMinHashRate: string;
            dayHashRate: string;
            validNum: number; // int
            invalidNum: number; // int
            profitToday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            profitYesterday: {
              BTC: string;
              BSV: string;
              BCH: string;
            };
            userName: string;
            unit: string;
            algo: string;
          };
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningStatisticsUserStatusRequestResult = RequestResult<
  Request,
  GetSapiV1MiningStatisticsUserStatusResponse
>;

export function getSapiV1MiningStatisticsUserStatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningStatisticsUserStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningStatisticsUserStatusEndpointSchema,
    }),
    config
  );
}
