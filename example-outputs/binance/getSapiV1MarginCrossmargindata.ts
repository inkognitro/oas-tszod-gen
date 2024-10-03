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

export const getSapiV1MarginCrossmargindataEndpointSchema = {
  path: '/sapi/v1/margin/crossMarginData',
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

export type GetSapiV1MarginCrossmargindataRequest = RequestUnion<
  any,
  any,
  {
    vipLevel?: number; // int
    coin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginCrossmargindataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel: number; // int
          coin: string;
          transferIn: boolean;
          borrowable: boolean;
          dailyInterest: string;
          yearlyInterest: string;
          borrowLimit: string;
          marginablePairs: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginCrossmargindataRequestResult = RequestResult<
  GetSapiV1MarginCrossmargindataRequest,
  GetSapiV1MarginCrossmargindataResponse
>;

export function getSapiV1MarginCrossmargindata(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginCrossmargindataRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginCrossmargindataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginCrossmargindataEndpointSchema, payload),
    config
  );
}
