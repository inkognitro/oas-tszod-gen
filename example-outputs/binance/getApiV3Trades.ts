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
import {Trade, Error} from '@example-outputs/binance';

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

export type GetApiV3TradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetApiV3TradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Trade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3TradesRequestResult = RequestResult<
  GetApiV3TradesRequest,
  GetApiV3TradesResponse
>;

export function getApiV3Trades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3TradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3TradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3TradesEndpointSchema, payload),
    config
  );
}
