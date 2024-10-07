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

export const getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/fetch-future-asset',
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

export type GetSapiV1ManagedSubaccountFetchFutureAssetRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ManagedSubaccountFetchFutureAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          message: string;
          snapshotVos: {
            type: string;
            updateTime: number; // int
            data: {
              assets: {
                asset: string;
                marginBalance: number;
                walletBalance: number;
              }[];
              position: {
                symbol: string;
                entryPrice: number;
                markPrice: number;
                positionAmt: number;
              }[];
            };
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountFetchFutureAssetRequest,
    GetSapiV1ManagedSubaccountFetchFutureAssetResponse
  >;

export function getSapiV1ManagedSubaccountFetchFutureAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountFetchFutureAssetRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema,
      payload
    ),
    config
  );
}
