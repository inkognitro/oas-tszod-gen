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

export const postSapiV1AssetDustEndpointSchema = {
  path: '/sapi/v1/asset/dust',
  method: 'post',
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

export type PostSapiV1AssetDustPayload = {
  queryParams: {
    asset: string[];
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetDustResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AssetDustRequestResult = RequestResult<
  Request,
  PostSapiV1AssetDustResponse
>;

export function postSapiV1AssetDust(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AssetDustPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetDustEndpointSchema,
    }),
    config
  );
}
