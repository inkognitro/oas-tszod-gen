import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {AggTrade, Error} from '@example-outputs/binance';

export const getApiV3AggtradesEndpointSchema = {
  path: '/api/v3/aggTrades',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
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
  payload: RequestPayload<GetApiV3AggtradesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AggtradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AggtradesEndpointSchema, payload),
    config
  );
}
