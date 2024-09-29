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

export const getSapiV1EthStakingEthHistoryRewardshistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/rewardsHistory',
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

export type GetSapiV1EthStakingEthHistoryRewardshistoryPayload = {
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

export type GetSapiV1EthStakingEthHistoryRewardshistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            asset: string;
            holding: string;
            amount: string;
            annualPercentageRate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRewardshistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingEthHistoryRewardshistoryResponse>;

export function getSapiV1EthStakingEthHistoryRewardshistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthHistoryRewardshistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRewardshistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingEthHistoryRewardshistoryEndpointSchema,
    }),
    config
  );
}
