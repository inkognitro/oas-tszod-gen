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

export const getSapiV1AssetAssetdividendEndpointSchema = {
  path: '/sapi/v1/asset/assetDividend',
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

export type GetSapiV1AssetAssetdividendRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetAssetdividendResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            id: number; // int
            amount: string;
            asset: string;
            divTime: number; // int
            enInfo: string;
            tranId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetAssetdividendRequestResult = RequestResult<
  GetSapiV1AssetAssetdividendRequest,
  GetSapiV1AssetAssetdividendResponse
>;

export function getSapiV1AssetAssetdividend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetAssetdividendRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetAssetdividendRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetAssetdividendEndpointSchema, payload),
    config
  );
}
