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

export const getSapiV1EthStakingWbethHistoryWraphistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/wrapHistory',
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

export type GetSapiV1EthStakingWbethHistoryWraphistoryPayload = {
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

export type GetSapiV1EthStakingWbethHistoryWraphistoryResponse =
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

export type GetSapiV1EthStakingWbethHistoryWraphistoryRequestResult =
  RequestResult<Request, GetSapiV1EthStakingWbethHistoryWraphistoryResponse>;

export function getSapiV1EthStakingWbethHistoryWraphistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1EthStakingWbethHistoryWraphistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingWbethHistoryWraphistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1EthStakingWbethHistoryWraphistoryEndpointSchema,
    }),
    config
  );
}
