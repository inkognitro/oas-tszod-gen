import {z_Error, Error} from '../../';
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
} from '../../core';

export const getTickerEndpointSchema = {
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetTickerRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    symbols?: string;
    windowSize?: string;
    type?: string;
  }
>;

export type GetTickerResponse =
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

export type GetTickerRequestResult = RequestResult<
  GetTickerRequest,
  GetTickerResponse
>;

export function getTicker(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTickerRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTickerRequestResult> {
  return requestHandler.execute(
    createRequest(getTickerEndpointSchema, payload),
    config
  );
}
