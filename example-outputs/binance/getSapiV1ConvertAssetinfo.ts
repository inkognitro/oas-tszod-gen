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

export const getSapiV1ConvertAssetinfoEndpointSchema = {
  path: '/sapi/v1/convert/assetInfo',
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

export type GetSapiV1ConvertAssetinfoRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ConvertAssetinfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          fraction: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertAssetinfoRequestResult = RequestResult<
  GetSapiV1ConvertAssetinfoRequest,
  GetSapiV1ConvertAssetinfoResponse
>;

export function getSapiV1ConvertAssetinfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ConvertAssetinfoRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertAssetinfoRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ConvertAssetinfoEndpointSchema, payload),
    config
  );
}
