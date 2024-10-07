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

export const getSapiV1NftHistoryTransactionsEndpointSchema = {
  path: '/sapi/v1/nft/history/transactions',
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

export type GetSapiV1NftHistoryTransactionsRequest = RequestUnion<
  any,
  any,
  {
    orderType: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1NftHistoryTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            orderNo: string;
            tokens: {
              network: string;
              tokenId: string;
              contractAddress: string;
            }[];
            tradeTime: number; // int
            tradeAmount: string;
            tradeCurrency: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftHistoryTransactionsRequestResult = RequestResult<
  GetSapiV1NftHistoryTransactionsRequest,
  GetSapiV1NftHistoryTransactionsResponse
>;

export function getSapiV1NftHistoryTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1NftHistoryTransactionsRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftHistoryTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1NftHistoryTransactionsEndpointSchema, payload),
    config
  );
}
