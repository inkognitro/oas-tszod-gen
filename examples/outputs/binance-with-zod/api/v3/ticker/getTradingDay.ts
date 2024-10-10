import {
  z_DayTicker,
  z_DayTickerList,
  z_Error,
  DayTicker,
  DayTickerList,
  Error,
} from '../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';

export const getTradingDayEndpointSchema = {
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
          zodSchema: z.union([z_DayTicker, z_DayTickerList]),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
