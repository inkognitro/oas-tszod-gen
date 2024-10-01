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

export const getSapiV1NftHistoryDepositEndpointSchema = {
  path: '/sapi/v1/nft/history/deposit',
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

export type GetSapiV1NftHistoryDepositPayload = {
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

export type GetSapiV1NftHistoryDepositResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            txID: null | number; // int
            contractAdrress: string;
            tokenId: string;
            timestamp: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftHistoryDepositRequestResult = RequestResult<
  Request,
  GetSapiV1NftHistoryDepositResponse
>;

export function getSapiV1NftHistoryDeposit(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1NftHistoryDepositPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftHistoryDepositRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1NftHistoryDepositEndpointSchema,
    }),
    config
  );
}
