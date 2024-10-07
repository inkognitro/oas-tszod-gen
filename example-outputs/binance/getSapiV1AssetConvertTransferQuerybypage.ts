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

export const getSapiV1AssetConvertTransferQuerybypageEndpointSchema = {
  path: '/sapi/v1/asset/convert-transfer/queryByPage',
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

export type GetSapiV1AssetConvertTransferQuerybypageRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1AssetConvertTransferQuerybypageResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetConvertTransferQuerybypageRequestResult =
  RequestResult<
    GetSapiV1AssetConvertTransferQuerybypageRequest,
    GetSapiV1AssetConvertTransferQuerybypageResponse
  >;

export function getSapiV1AssetConvertTransferQuerybypage(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AssetConvertTransferQuerybypageRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetConvertTransferQuerybypageRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1AssetConvertTransferQuerybypageEndpointSchema,
      payload
    ),
    config
  );
}
