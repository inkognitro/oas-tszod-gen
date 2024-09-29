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

export const getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/unwrapHistory',
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

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryPayload = {
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

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            time: number; // int
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            exchangeRate: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse>;

export function getSapiV1EthStakingWbethHistoryUnwraphistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingWbethHistoryUnwraphistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema,
    }),
    config
  );
}
