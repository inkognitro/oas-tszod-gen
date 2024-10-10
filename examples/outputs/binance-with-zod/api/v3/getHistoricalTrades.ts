import {z_Trade, Trade} from '../../';
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

export const getHistoricalTradesEndpointSchema = {
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
          zodSchema: z.array(z_Trade),
        },
      },
    },
  },
};

export type GetHistoricalTradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
    fromId?: number; // int
  }
>;

export type GetHistoricalTradesResponse = ResponseUnion<
  200,
  ResponseBodyData<'application/json', Trade[]>
>;

export type GetHistoricalTradesRequestResult = RequestResult<
  GetHistoricalTradesRequest,
  GetHistoricalTradesResponse
>;

export function getHistoricalTrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetHistoricalTradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetHistoricalTradesRequestResult> {
  return requestHandler.execute(
    createRequest(getHistoricalTradesEndpointSchema, payload),
    config
  );
}
