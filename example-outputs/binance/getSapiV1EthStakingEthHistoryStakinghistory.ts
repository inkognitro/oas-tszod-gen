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

export const getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/stakingHistory',
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

export type GetSapiV1EthStakingEthHistoryStakinghistoryRequest = RequestUnion<
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

export type GetSapiV1EthStakingEthHistoryStakinghistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            asset: string;
            amount: string;
            status: string;
            distributeAmount: string;
            conversionRatio: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingEthHistoryStakinghistoryRequest,
    GetSapiV1EthStakingEthHistoryStakinghistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryStakinghistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingEthHistoryStakinghistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema,
      payload
    ),
    config
  );
}
