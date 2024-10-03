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

export const getSapiV1AssetCustodyTransferHistoryEndpointSchema = {
  path: '/sapi/v1/asset/custody/transfer-history',
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

export type GetSapiV1AssetCustodyTransferHistoryRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    startTime: number; // int
    endTime: number; // int
    type?: string;
    asset: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AssetCustodyTransferHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            clientTranId: string;
            transferType: string;
            asset: string;
            amount: string;
            time: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetCustodyTransferHistoryRequestResult = RequestResult<
  GetSapiV1AssetCustodyTransferHistoryRequest,
  GetSapiV1AssetCustodyTransferHistoryResponse
>;

export function getSapiV1AssetCustodyTransferHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AssetCustodyTransferHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetCustodyTransferHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AssetCustodyTransferHistoryEndpointSchema, payload),
    config
  );
}
