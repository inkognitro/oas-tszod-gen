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

export const postSapiV1AssetDustEndpointSchema = {
  path: '/sapi/v1/asset/dust',
  method: 'post',
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

export type PostSapiV1AssetDustRequest = RequestUnion<
  any,
  any,
  {
    asset: string[];
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1AssetDustResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalServiceCharge: string;
          totalTransfered: string;
          transferResult: {
            amount: string;
            fromAsset: string;
            operateTime: number; // int
            serviceChargeAmount: string;
            tranId: number; // int
            transferedAmount: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetDustRequestResult = RequestResult<
  PostSapiV1AssetDustRequest,
  PostSapiV1AssetDustResponse
>;

export function postSapiV1AssetDust(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1AssetDustRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1AssetDustEndpointSchema, payload),
    config
  );
}
