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

export type GetSapiV1LendingAutoInvestRebalanceHistoryPayload = {
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

export type GetSapiV1LendingAutoInvestRebalanceHistoryResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestRebalanceHistoryResponse>;

export function getSapiV1LendingAutoInvestRebalanceHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestRebalanceHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRebalanceHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestRebalanceHistoryEndpointSchema,
    }),
    config
  );
}
