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

export const getSapiV1AssetWalletBalanceEndpointSchema = {
  path: '/sapi/v1/asset/wallet/balance',
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

export type GetSapiV1AssetWalletBalanceRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetWalletBalanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          activate: boolean;
          balance: string;
          walletName: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetWalletBalanceRequestResult = RequestResult<
  GetSapiV1AssetWalletBalanceRequest,
  GetSapiV1AssetWalletBalanceResponse
>;

export function getSapiV1AssetWalletBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AssetWalletBalanceRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetWalletBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetWalletBalanceEndpointSchema, payload),
    config
  );
}
