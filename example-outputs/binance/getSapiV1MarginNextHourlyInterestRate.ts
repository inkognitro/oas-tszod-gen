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

export type GetSapiV1MarginNextHourlyInterestRateRequest = RequestUnion<
  any,
  any,
  {
    assets?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginNextHourlyInterestRateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          nextHourlyInterestRate: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginNextHourlyInterestRateRequestResult = RequestResult<
  GetSapiV1MarginNextHourlyInterestRateRequest,
  GetSapiV1MarginNextHourlyInterestRateResponse
>;

export function getSapiV1MarginNextHourlyInterestRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginNextHourlyInterestRateRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginNextHourlyInterestRateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginNextHourlyInterestRateEndpointSchema, payload),
    config
  );
}
