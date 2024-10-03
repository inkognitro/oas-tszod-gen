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
import {DayTicker, DayTickerList, Error} from '@example-outputs/binance';

export const getApiV3TickerTradingdayEndpointSchema = {
  path: '/api/v3/ticker/tradingDay',
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

export type GetApiV3TickerTradingdayRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    timeZone?: string;
    type?: 'FULL' | 'MINI';
  }
>;

export type GetApiV3TickerTradingdayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', DayTicker | DayTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerTradingdayRequestResult = RequestResult<
  GetApiV3TickerTradingdayRequest,
  GetApiV3TickerTradingdayResponse
>;

export function getApiV3TickerTradingday(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3TickerTradingdayRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerTradingdayRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TickerTradingdayEndpointSchema, payload),
    config
  );
}
