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

export const getSapiV1ManagedSubaccountMarginassetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/marginAsset',
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

export type GetSapiV1ManagedSubaccountMarginassetPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountMarginassetResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          marginLevel: string;
          totalAssetOfBtc: string;
          totalLiabilityOfBtc: string;
          totalNetAssetOfBtc: string;
          userAssets: {
            asset: string;
            borrowed: string;
            free: string;
            interest: string;
            locked: string;
            netAsset: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountMarginassetRequestResult = RequestResult<
  Request,
  GetSapiV1ManagedSubaccountMarginassetResponse
>;

export function getSapiV1ManagedSubaccountMarginasset(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountMarginassetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountMarginassetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountMarginassetEndpointSchema,
    }),
    config
  );
}
