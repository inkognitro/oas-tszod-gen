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

export const getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rateHistory',
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

export type GetSapiV1EthStakingEthHistoryRatehistoryPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1EthStakingEthHistoryRatehistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            annualPercentageRate: string;
            exchangeRate: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRatehistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingEthHistoryRatehistoryResponse>;

export function getSapiV1EthStakingEthHistoryRatehistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthHistoryRatehistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRatehistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema,
    }),
    config
  );
}
