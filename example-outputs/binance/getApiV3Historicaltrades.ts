import {Trade} from '@example-outputs/binance';
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

export const getApiV3HistoricaltradesEndpointSchema = {
  path: '/api/v3/historicalTrades',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
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
  requestHandler: RequestHandler,
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
