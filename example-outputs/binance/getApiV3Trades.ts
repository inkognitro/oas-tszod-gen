import {Trade, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getApiV3TradesEndpointSchema = {
  path: '/api/v3/trades',
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

export type GetApiV3TradesPayload = {
  queryParams: {
    symbol: string;
    limit?: number; // int
  };
};

export type GetApiV3TradesResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', Trade[]>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3TradesRequestResult = RequestResult<
  Request,
  GetApiV3TradesResponse
>;

export function getApiV3Trades(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3TradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TradesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3TradesEndpointSchema}),
    config
  );
}
