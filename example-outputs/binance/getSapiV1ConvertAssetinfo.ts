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

export type GetSapiV1ConvertAssetinfoPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertAssetinfoResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          fraction: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertAssetinfoRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertAssetinfoResponse
>;

export function getSapiV1ConvertAssetinfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertAssetinfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertAssetinfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertAssetinfoEndpointSchema,
    }),
    config
  );
}
