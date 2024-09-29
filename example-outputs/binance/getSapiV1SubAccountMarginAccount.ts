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

export const getSapiV1SubAccountMarginAccountEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/account',
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

export type GetSapiV1SubAccountMarginAccountPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountMarginAccountResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          marginLevel: string;
          totalAssetOfBtc: string;
          totalLiabilityOfBtc: string;
          totalNetAssetOfBtc: string;
          marginTradeCoeffVo: {
            forceLiquidationBar: string;
            marginCallBar: string;
            normalBar: string;
          };
          marginUserAssetVoList: {
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

export type GetSapiV1SubAccountMarginAccountRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountMarginAccountResponse
>;

export function getSapiV1SubAccountMarginAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountMarginAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountMarginAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountMarginAccountEndpointSchema,
    }),
    config
  );
}
