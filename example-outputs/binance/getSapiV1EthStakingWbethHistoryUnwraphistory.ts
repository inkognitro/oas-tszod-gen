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

export const getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/history/unwrapHistory',
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

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest = RequestUnion<
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

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult =
  RequestResult<
    GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest,
    GetSapiV1EthStakingWbethHistoryUnwraphistoryResponse
  >;

export function getSapiV1EthStakingWbethHistoryUnwraphistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1EthStakingWbethHistoryUnwraphistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1EthStakingWbethHistoryUnwraphistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1EthStakingWbethHistoryUnwraphistoryEndpointSchema,
      payload
    ),
    config
  );
}
