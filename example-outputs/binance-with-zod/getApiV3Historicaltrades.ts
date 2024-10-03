import {tradeZodSchema, Trade} from '@example-outputs/binance-with-zod';
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

export const getApiV3HistoricaltradesEndpointSchema = {
  path: '/api/v3/historicalTrades',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    limit: z.number().int().safe().finite().optional(),
    fromId: z.number().int().safe().finite().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(tradeZodSchema),
        },
      },
    },
  },
};

export type GetApiV3HistoricaltradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
    fromId?: number; // int
  }
>;

export type GetApiV3HistoricaltradesResponse = ResponseUnion<
  200,
  ResponseBodyData<'application/json', Trade[]>
>;

export type GetApiV3HistoricaltradesRequestResult = RequestResult<
  GetApiV3HistoricaltradesRequest,
  GetApiV3HistoricaltradesResponse
>;

export function getApiV3Historicaltrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3HistoricaltradesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3HistoricaltradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3HistoricaltradesEndpointSchema, payload),
    config
  );
}
