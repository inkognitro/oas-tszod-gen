import {AggTrade, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3AggtradesPayload = {
  queryParams: {
    symbol: string;
    fromId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
  };
};

export type GetApiV3AggtradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', AggTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AggtradesRequestResult = RequestResult<
  Request,
  GetApiV3AggtradesResponse
>;

export function getApiV3Aggtrades(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AggtradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AggtradesRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3AggtradesEndpointSchema,
    }),
    config
  );
}
