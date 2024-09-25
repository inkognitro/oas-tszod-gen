import {tradeZodSchema, Trade} from '@example-outputs/binance-with-zod';
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

export type GetApiV3HistoricaltradesPayload = {
  queryParams: {
    symbol: string;
    limit?: number; // int
    fromId?: number; // int
  };
};

export type GetApiV3HistoricaltradesResponse = Response<
  200,
  ResponseData<ResponseBodyData<'application/json', Trade[]>>
>;

export type GetApiV3HistoricaltradesRequestResult = RequestResult<
  Request,
  GetApiV3HistoricaltradesResponse
>;

export function getApiV3Historicaltrades(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3HistoricaltradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3HistoricaltradesRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3HistoricaltradesEndpointSchema,
    }),
    config
  );
}
