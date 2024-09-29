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

export const getSapiV1LendingAutoInvestAllAssetEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/all/asset',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1LendingAutoInvestAllAssetPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestAllAssetResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          targetAssets: string[];
          sourceAssets: string[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestAllAssetRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestAllAssetResponse
>;

export function getSapiV1LendingAutoInvestAllAsset(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestAllAssetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestAllAssetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestAllAssetEndpointSchema,
    }),
    config
  );
}
