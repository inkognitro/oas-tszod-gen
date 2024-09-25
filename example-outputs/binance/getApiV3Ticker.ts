import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3TickerPayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
    windowSize?: string;
    type?: string;
  };
};

export type GetApiV3TickerResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3TickerRequestResult = RequestResult<
  Request,
  GetApiV3TickerResponse
>;

export function getApiV3Ticker(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3TickerPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3TickerEndpointSchema}),
    config
  );
}
