import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1NftHistoryDepositEndpointSchema = {
  path: '/sapi/v1/nft/history/deposit',
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
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

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
