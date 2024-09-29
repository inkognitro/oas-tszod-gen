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

export type GetSapiV1AssetAssetdividendPayload = {
  queryParams: {
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetAssetdividendResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetAssetdividendRequestResult = RequestResult<
  Request,
  GetSapiV1AssetAssetdividendResponse
>;

export function getSapiV1AssetAssetdividend(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetAssetdividendPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetAssetdividendRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetAssetdividendEndpointSchema,
    }),
    config
  );
}
