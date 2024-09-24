import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1AlgoFuturesHistoricalordersEndpointSchema = {
  path: '/sapi/v1/algo/futures/historicalOrders',
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

export type GetSapiV1AlgoFuturesHistoricalordersPayload = {
  queryParams: {
    symbol?: string;
    side?: 'SELL' | 'BUY';
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoFuturesHistoricalordersResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            orders: {
              algoId: number; // int
              symbol: string;
              side: string;
              positionSide: string;
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AlgoFuturesHistoricalordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoFuturesHistoricalordersResponse
>;

export function getSapiV1AlgoFuturesHistoricalorders(
  requestHandler: RequestHandler,
  payload: GetSapiV1AlgoFuturesHistoricalordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoFuturesHistoricalordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoFuturesHistoricalordersEndpointSchema,
    }),
    config
  );
}
