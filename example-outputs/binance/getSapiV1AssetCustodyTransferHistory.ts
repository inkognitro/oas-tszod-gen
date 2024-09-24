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

export const getSapiV1AssetCustodyTransferHistoryEndpointSchema = {
  path: '/sapi/v1/asset/custody/transfer-history',
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

export type GetSapiV1AssetCustodyTransferHistoryPayload = {
  queryParams: {
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
  };
};

export type GetSapiV1AssetCustodyTransferHistoryResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AssetCustodyTransferHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1AssetCustodyTransferHistoryResponse
>;

export function getSapiV1AssetCustodyTransferHistory(
  requestHandler: RequestHandler,
  payload: GetSapiV1AssetCustodyTransferHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetCustodyTransferHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetCustodyTransferHistoryEndpointSchema,
    }),
    config
  );
}
