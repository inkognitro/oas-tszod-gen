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

export const postSapiV3AssetGetuserassetEndpointSchema = {
  path: '/sapi/v3/asset/getUserAsset',
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

export type PostSapiV3AssetGetuserassetPayload = {
  queryParams: {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV3AssetGetuserassetResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            asset: string;
            free: string;
            locked: string;
            freeze: string;
            withdrawing: string;
            ipoable: string;
            btcValuation: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV3AssetGetuserassetRequestResult = RequestResult<
  Request,
  PostSapiV3AssetGetuserassetResponse
>;

export function postSapiV3AssetGetuserasset(
  requestHandler: RequestHandler,
  payload: PostSapiV3AssetGetuserassetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV3AssetGetuserassetRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV3AssetGetuserassetEndpointSchema,
    }),
    config
  );
}
