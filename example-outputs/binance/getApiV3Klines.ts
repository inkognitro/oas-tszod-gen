import {Error} from '@example-outputs/binance';
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

export const getApiV3KlinesEndpointSchema = {
  path: '/api/v3/klines',
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

export type GetApiV3KlinesPayload = {
  queryParams: {
    symbol: string;
    interval:
      | '1s'
      | '1m'
      | '3m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '2h'
      | '4h'
      | '6h'
      | '8h'
      | '12h'
      | '1d'
      | '3d'
      | '1w'
      | '1M';
    startTime?: number; // int
    endTime?: number; // int
    timeZone?: string;
    limit?: number; // int
  };
};

export type GetApiV3KlinesResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          (
            | number // int
            | string
          )[][]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3KlinesRequestResult = RequestResult<
  Request,
  GetApiV3KlinesResponse
>;

export function getApiV3Klines(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3KlinesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3KlinesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3KlinesEndpointSchema}),
    config
  );
}
