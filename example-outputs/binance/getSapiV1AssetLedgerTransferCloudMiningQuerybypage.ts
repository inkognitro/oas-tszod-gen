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

export const getSapiV1AssetLedgerTransferCloudMiningQuerybypageEndpointSchema =
  {
    path: '/sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage',
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

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypagePayload = {
  queryParams: {
    tranId?: number; // int
    clientTranId?: string;
    asset?: string;
    startTime: number; // int
    endTime: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            createTime: number; // int
            tranId: number; // int
            type: number; // int
            asset: string;
            amount: string;
            status: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypageRequestResult =
  RequestResult<
    Request,
    GetSapiV1AssetLedgerTransferCloudMiningQuerybypageResponse
  >;

export function getSapiV1AssetLedgerTransferCloudMiningQuerybypage(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetLedgerTransferCloudMiningQuerybypagePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetLedgerTransferCloudMiningQuerybypageRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1AssetLedgerTransferCloudMiningQuerybypageEndpointSchema,
    }),
    config
  );
}
