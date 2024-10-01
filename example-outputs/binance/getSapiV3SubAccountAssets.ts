import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV3SubAccountAssetsEndpointSchema = {
  path: '/sapi/v3/sub-account/assets',
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

export type GetSapiV3SubAccountAssetsPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV3SubAccountAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          balances: {
            asset: string;
            free: number; // int
            locked: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV3SubAccountAssetsRequestResult = RequestResult<
  Request,
  GetSapiV3SubAccountAssetsResponse
>;

export function getSapiV3SubAccountAssets(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV3SubAccountAssetsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV3SubAccountAssetsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV3SubAccountAssetsEndpointSchema,
    }),
    config
  );
}
