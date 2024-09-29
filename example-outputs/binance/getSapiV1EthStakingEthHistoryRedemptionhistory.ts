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

export const getSapiV1EthStakingEthHistoryRedemptionhistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/eth/history/redemptionHistory',
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

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryPayload = {
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

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            arrivalTime: number; // int
            asset: string;
            amount: string;
            status: string;
            distributeAsset: string;
            distributeAmount: string;
            conversionRatio: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingEthHistoryRedemptionhistoryRequestResult =
  RequestResult<
    Request,
    GetSapiV1EthStakingEthHistoryRedemptionhistoryResponse
  >;

export function getSapiV1EthStakingEthHistoryRedemptionhistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingEthHistoryRedemptionhistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingEthHistoryRedemptionhistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1EthStakingEthHistoryRedemptionhistoryEndpointSchema,
    }),
    config
  );
}
