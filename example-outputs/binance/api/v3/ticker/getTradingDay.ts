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

export const getTradingDayEndpointSchema = {
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

export type GetTradingDayRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    timeZone?: string;
    type?: 'FULL' | 'MINI';
  }
>;

export type GetTradingDayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', DayTicker | DayTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetTradingDayRequestResult = RequestResult<
  GetTradingDayRequest,
  GetTradingDayResponse
>;

export function getTradingDay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTradingDayRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTradingDayRequestResult> {
  return requestHandler.execute(
    createRequest(getTradingDayEndpointSchema, payload),
    config
  );
}
