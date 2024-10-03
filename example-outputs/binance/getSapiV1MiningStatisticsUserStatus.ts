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

export type GetSapiV1MiningStatisticsUserStatusRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningStatisticsUserStatusResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningStatisticsUserStatusRequestResult = RequestResult<
  GetSapiV1MiningStatisticsUserStatusRequest,
  GetSapiV1MiningStatisticsUserStatusResponse
>;

export function getSapiV1MiningStatisticsUserStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningStatisticsUserStatusRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningStatisticsUserStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningStatisticsUserStatusEndpointSchema, payload),
    config
  );
}
