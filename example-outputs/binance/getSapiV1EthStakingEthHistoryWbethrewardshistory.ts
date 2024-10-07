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

export const getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/wbethRewardsHistory',
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

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest =
  RequestUnion<
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

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          estRewardsInETH: string;
          rows: {
            time: number; // int
            amountInETH: string;
            holding: string;
            holdingInETH: string;
            annualPercentageRate: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest,
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryWbethrewardshistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryWbethrewardshistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryWbethrewardshistoryEndpointSchema,
      payload
    ),
    config
  );
}
