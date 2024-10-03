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

export const getSapiV1LendingAutoInvestRebalanceHistoryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/rebalance/history',
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

export type GetSapiV1LendingAutoInvestRebalanceHistoryRequest = RequestUnion<
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

export type GetSapiV1LendingAutoInvestRebalanceHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          indexId: number; // int
          indexName: string;
          rebalanceId: number; // int
          status: string;
          rebalanceFee: string;
          rebalanceFeeUnit: string;
          transactionDetails: {
            asset: string;
            transactionDateTime: number; // int
            rebalanceDirection: string;
            rebalanceAmount: string;
          }[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult =
  RequestResult<
    GetSapiV1LendingAutoInvestRebalanceHistoryRequest,
    GetSapiV1LendingAutoInvestRebalanceHistoryResponse
  >;

export function getSapiV1LendingAutoInvestRebalanceHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestRebalanceHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1LendingAutoInvestRebalanceHistoryEndpointSchema,
      payload
    ),
    config
  );
}
