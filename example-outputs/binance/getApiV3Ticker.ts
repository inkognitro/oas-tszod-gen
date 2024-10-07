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

export const getApiV3TickerEndpointSchema = {
  path: '/api/v3/ticker',
  method: 'get',
  supportedSecuritySchemas: [],
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
  },
};

export type GetApiV3TickerRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    windowSize?: string;
    type?: string;
  }
>;

export type GetApiV3TickerResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          priceChange: string;
          priceChangePercent: string;
          weightedAvgPrice: string;
          openPrice: string;
          highPrice: string;
          lowPrice: string;
          lastPrice: string;
          volume: string;
          quoteVolume: string;
          openTime: number; // int
          closeTime: number; // int
          firstId: number; // int
          lastId: number; // int
          count: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerRequestResult = RequestResult<
  GetApiV3TickerRequest,
  GetApiV3TickerResponse
>;

export function getApiV3Ticker(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3TickerRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TickerEndpointSchema, payload),
    config
  );
}
