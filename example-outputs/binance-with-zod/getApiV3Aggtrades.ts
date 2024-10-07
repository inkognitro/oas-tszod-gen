import {
  z_AggTrade,
  z_Error,
  AggTrade,
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

export const getApiV3AggtradesEndpointSchema = {
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

export type GetApiV3AggtradesRequest = RequestUnion<
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

export type GetApiV3AggtradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', AggTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AggtradesRequestResult = RequestResult<
  GetApiV3AggtradesRequest,
  GetApiV3AggtradesResponse
>;

export function getApiV3Aggtrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AggtradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AggtradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AggtradesEndpointSchema, payload),
    config
  );
}
