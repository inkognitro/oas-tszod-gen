import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/fetch-future-asset',
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

export type GetSapiV1ManagedSubaccountFetchFutureAssetPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountFetchFutureAssetResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult =
  RequestResult<Request, GetSapiV1ManagedSubaccountFetchFutureAssetResponse>;

export function getSapiV1ManagedSubaccountFetchFutureAsset(
  requestHandler: RequestHandler,
  payload: GetSapiV1ManagedSubaccountFetchFutureAssetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema,
    }),
    config
  );
}
