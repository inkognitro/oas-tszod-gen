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
import {Error} from '@example-outputs/binance';

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

export type GetApiV3KlinesRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetApiV3KlinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (
          | number // int
          | string
        )[][]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3KlinesRequestResult = RequestResult<
  GetApiV3KlinesRequest,
  GetApiV3KlinesResponse
>;

export function getApiV3Klines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3KlinesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3KlinesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3KlinesEndpointSchema, payload),
    config
  );
}
