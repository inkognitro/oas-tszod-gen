import {z_AggTrade, z_Error, AggTrade, Error} from '../../';
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

export const getAggTradesEndpointSchema = {
  path: '/api/v3/aggTrades',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    fromId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(z_AggTrade),
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

export type GetAggTradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    fromId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
  }
>;

export type GetAggTradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', AggTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAggTradesRequestResult = RequestResult<
  GetAggTradesRequest,
  GetAggTradesResponse
>;

export function getAggTrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAggTradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAggTradesRequestResult> {
  return requestHandler.execute(
    createRequest(getAggTradesEndpointSchema, payload),
    config
  );
}
