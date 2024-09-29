import {DayTicker, DayTickerList, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3TickerTradingdayPayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
    timeZone?: string;
    type?: 'FULL' | 'MINI';
  };
};

export type GetApiV3TickerTradingdayResponse =
  | Response<
      200,
      ResponseBodyData<'application/json', DayTicker | DayTickerList>
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TickerTradingdayRequestResult = RequestResult<
  Request,
  GetApiV3TickerTradingdayResponse
>;

export function getApiV3TickerTradingday(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3TickerTradingdayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TickerTradingdayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3TickerTradingdayEndpointSchema,
    }),
    config
  );
}
