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

export const getApiV3UiklinesEndpointSchema = {
  path: '/api/v3/uiKlines',
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

export type GetApiV3UiklinesPayload = {
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

export type GetApiV3UiklinesResponse =
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

export type GetApiV3UiklinesRequestResult = RequestResult<
  Request,
  GetApiV3UiklinesResponse
>;

export function getApiV3Uiklines(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3UiklinesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3UiklinesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3UiklinesEndpointSchema}),
    config
  );
}
