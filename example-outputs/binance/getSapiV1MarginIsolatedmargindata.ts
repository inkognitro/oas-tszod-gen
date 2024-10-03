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

export const getSapiV1MarginIsolatedmargindataEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginData',
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

export type GetSapiV1MarginIsolatedmargindataRequest = RequestUnion<
  any,
  any,
  {
    vipLevel?: number; // int
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedmargindataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel?: number; // int
          symbol?: string;
          leverage?: string;
          data?: {
            coin?: string;
            dailyInterest?: string;
            borrowLimit?: string;
          }[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedmargindataRequestResult = RequestResult<
  GetSapiV1MarginIsolatedmargindataRequest,
  GetSapiV1MarginIsolatedmargindataResponse
>;

export function getSapiV1MarginIsolatedmargindata(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginIsolatedmargindataRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargindataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedmargindataEndpointSchema, payload),
    config
  );
}
