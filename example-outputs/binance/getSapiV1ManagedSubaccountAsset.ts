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

export const getSapiV1ManagedSubaccountAssetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/asset',
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

export type GetSapiV1ManagedSubaccountAssetRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ManagedSubaccountAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          name: string;
          totalBalance: string;
          availableBalance: string;
          inOrder: string;
          btcValue: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountAssetRequestResult = RequestResult<
  GetSapiV1ManagedSubaccountAssetRequest,
  GetSapiV1ManagedSubaccountAssetResponse
>;

export function getSapiV1ManagedSubaccountAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountAssetRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountAssetRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ManagedSubaccountAssetEndpointSchema, payload),
    config
  );
}
