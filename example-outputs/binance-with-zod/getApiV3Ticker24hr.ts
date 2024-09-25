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
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3Ticker24hrEndpointSchema = {
  path: '/api/v3/ticker/24hr',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
    type: z.enum('FULL', 'MINI').optional(),
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

export type GetApiV3Ticker24hrPayload = {
  queryParams: {
    symbol?: string;
    symbols?: string;
    type?: 'FULL' | 'MINI';
  };
};

export type GetApiV3Ticker24hrResponse =
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', Ticker | TickerList>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3Ticker24hrRequestResult = RequestResult<
  Request,
  GetApiV3Ticker24hrResponse
>;

export function getApiV3Ticker24hr(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3Ticker24hrPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3Ticker24hrRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3Ticker24hrEndpointSchema,
    }),
    config
  );
}
