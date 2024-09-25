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

export const getSapiV1AssetConvertTransferQuerybypageEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer/queryByPage',
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

export type GetSapiV1AssetConvertTransferQuerybypagePayload = {
  queryParams: {
    tranId?: number; // int
    asset?: string;
    startTime: number; // int
    endTime: number; // int
    accountType?: 'MAIN' | 'CARD';
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetConvertTransferQuerybypageResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            rows: {
              tranId: number; // int
              type: number; // int
              time: number; // int
              deductedAsset: string;
              deductedAmount: string;
              targetAsset: string;
              targetAmount: string;
              status: string;
              accountType: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AssetConvertTransferQuerybypageRequestResult =
  RequestResult<Request, GetSapiV1AssetConvertTransferQuerybypageResponse>;

export function getSapiV1AssetConvertTransferQuerybypage(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetConvertTransferQuerybypagePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetConvertTransferQuerybypageRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetConvertTransferQuerybypageEndpointSchema,
    }),
    config
  );
}
