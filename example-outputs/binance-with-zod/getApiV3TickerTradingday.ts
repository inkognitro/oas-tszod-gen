import {
  dayTickerZodSchema,
  dayTickerListZodSchema,
  errorZodSchema,
  DayTicker,
  DayTickerList,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3TickerTradingdayEndpointSchema = {
  path: '/api/v3/ticker/tradingDay',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
    timeZone: z.string().optional(),
    type: z.enum(['FULL', 'MINI']).optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([dayTickerZodSchema, dayTickerListZodSchema]),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', DayTicker | DayTickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

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
