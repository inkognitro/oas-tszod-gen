import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/stakingHistory',
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

export type GetSapiV1EthStakingEthHistoryStakinghistoryPayload = {
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

export type GetSapiV1EthStakingEthHistoryStakinghistoryResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingEthHistoryStakinghistoryResponse>;

export function getSapiV1EthStakingEthHistoryStakinghistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthHistoryStakinghistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema,
    }),
    config
  );
}
