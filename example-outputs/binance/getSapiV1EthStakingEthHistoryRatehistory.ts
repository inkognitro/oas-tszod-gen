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

export const getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rateHistory',
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

export type GetSapiV1EthStakingEthHistoryRatehistoryRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1EthStakingEthHistoryRatehistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRatehistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryRatehistoryRequest,
    GetSapiV1EthStakingEthHistoryRatehistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryRatehistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryRatehistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRatehistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryRatehistoryEndpointSchema,
      payload
    ),
    config
  );
}
