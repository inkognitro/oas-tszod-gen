import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getApiV3TickerEndpointSchema = {
  path: '/api/v3/ticker',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    symbols: z.string().optional(),
    windowSize: z.string().optional(),
    type: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            symbol: z.string(),
            priceChange: z.string(),
            priceChangePercent: z.string(),
            weightedAvgPrice: z.string(),
            openPrice: z.string(),
            highPrice: z.string(),
            lowPrice: z.string(),
            lastPrice: z.string(),
            volume: z.string(),
            quoteVolume: z.string(),
            openTime: z.number().int().safe().finite(),
            closeTime: z.number().int().safe().finite(),
            firstId: z.number().int().safe().finite(),
            lastId: z.number().int().safe().finite(),
            count: z.number().int().safe().finite(),
          }),
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
