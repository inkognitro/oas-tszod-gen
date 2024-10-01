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

export const getSapiV1NftHistoryWithdrawEndpointSchema = {
  path: '/sapi/v1/nft/history/withdraw',
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

export type GetSapiV1NftHistoryWithdrawPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1NftHistoryWithdrawResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            txID: string;
            contractAdrress: string;
            tokenId: string;
            timestamp: number; // int
            fee: number;
            feeAsset: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftHistoryWithdrawRequestResult = RequestResult<
  Request,
  GetSapiV1NftHistoryWithdrawResponse
>;

export function getSapiV1NftHistoryWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1NftHistoryWithdrawPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftHistoryWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1NftHistoryWithdrawEndpointSchema,
    }),
    config
  );
}
