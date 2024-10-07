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

export type GetSapiV3SubAccountAssetsRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  GetSapiV3SubAccountAssetsRequest,
  GetSapiV3SubAccountAssetsResponse
>;

export function getSapiV3SubAccountAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV3SubAccountAssetsRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV3SubAccountAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV3SubAccountAssetsEndpointSchema, payload),
    config
  );
}
