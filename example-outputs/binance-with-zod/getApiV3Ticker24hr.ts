import {
  tickerZodSchema,
  tickerListZodSchema,
  errorZodSchema,
  Ticker,
  TickerList,
  Error,
} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getApiV3Ticker24hrEndpointSchema = {
  path: '/api/v3/ticker/24hr',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
    type: z.enum(['FULL', 'MINI']).optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([tickerZodSchema, tickerListZodSchema]),
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

export type GetApiV3Ticker24hrRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    type?: 'FULL' | 'MINI';
  }
>;

export type GetApiV3Ticker24hrResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Ticker | TickerList>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3Ticker24hrRequestResult = RequestResult<
  GetApiV3Ticker24hrRequest,
  GetApiV3Ticker24hrResponse
>;

export function getApiV3Ticker24hr(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3Ticker24hrRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3Ticker24hrRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3Ticker24hrEndpointSchema, payload),
    config
  );
}
