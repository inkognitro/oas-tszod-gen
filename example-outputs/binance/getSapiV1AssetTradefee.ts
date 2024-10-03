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

export const getSapiV1AssetTradefeeEndpointSchema = {
  path: '/sapi/v1/asset/tradeFee',
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

export type GetSapiV1AssetTradefeeRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetTradefeeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          makerCommission: string;
          takerCommission: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetTradefeeRequestResult = RequestResult<
  GetSapiV1AssetTradefeeRequest,
  GetSapiV1AssetTradefeeResponse
>;

export function getSapiV1AssetTradefee(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetTradefeeRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetTradefeeRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetTradefeeEndpointSchema, payload),
    config
  );
}
