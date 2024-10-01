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

export const getSapiV4SubAccountAssetsEndpointSchema = {
  path: '/sapi/v4/sub-account/assets',
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

export type GetSapiV4SubAccountAssetsPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV4SubAccountAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          balances: {
            asset: string;
            free: string;
            locked: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV4SubAccountAssetsRequestResult = RequestResult<
  Request,
  GetSapiV4SubAccountAssetsResponse
>;

export function getSapiV4SubAccountAssets(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV4SubAccountAssetsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV4SubAccountAssetsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV4SubAccountAssetsEndpointSchema,
    }),
    config
  );
}
