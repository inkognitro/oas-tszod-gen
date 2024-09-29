import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginNextHourlyInterestRateEndpointSchema = {
  path: '/sapi/v1/margin/next-hourly-interest-rate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV1MarginNextHourlyInterestRatePayload = {
  queryParams: {
    assets?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginNextHourlyInterestRateResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          nextHourlyInterestRate: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginNextHourlyInterestRateRequestResult = RequestResult<
  Request,
  GetSapiV1MarginNextHourlyInterestRateResponse
>;

export function getSapiV1MarginNextHourlyInterestRate(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginNextHourlyInterestRatePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginNextHourlyInterestRateRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginNextHourlyInterestRateEndpointSchema,
    }),
    config
  );
}
