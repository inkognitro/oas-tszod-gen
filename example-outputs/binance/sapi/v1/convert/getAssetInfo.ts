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

export const getAssetInfoEndpointSchema = {
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

export type GetAssetInfoRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetInfoResponse =
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

export type GetAssetInfoRequestResult = RequestResult<
  GetAssetInfoRequest,
  GetAssetInfoResponse
>;

export function getAssetInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetInfoRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetInfoEndpointSchema, payload),
    config
  );
}
