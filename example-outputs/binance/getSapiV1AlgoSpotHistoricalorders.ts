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

export const getSapiV1AlgoSpotHistoricalordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/historicalOrders',
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

export type GetSapiV1AlgoSpotHistoricalordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AlgoSpotHistoricalordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          orders: {
            algoId: number; // int
            symbol: string;
            side: string;
            totalQty: string;
            executedQty: string;
            executedAmt: string;
            avgPrice: string;
            clientAlgoId: string;
            bookTime: number; // int
            endTime: number; // int
            algoStatus: string;
            algoType: string;
            urgency: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoSpotHistoricalordersRequestResult = RequestResult<
  GetSapiV1AlgoSpotHistoricalordersRequest,
  GetSapiV1AlgoSpotHistoricalordersResponse
>;

export function getSapiV1AlgoSpotHistoricalorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AlgoSpotHistoricalordersRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotHistoricalordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AlgoSpotHistoricalordersEndpointSchema, payload),
    config
  );
}
