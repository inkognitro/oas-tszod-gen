import {AggTrade, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
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
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', AggTrade[]>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AggtradesRequestResult = RequestResult<
  Request,
  GetApiV3AggtradesResponse
>;

export function getApiV3Aggtrades(
  requestHandler: RequestHandler,
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
