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

export const postSapiV3AssetGetuserassetEndpointSchema = {
  path: '/sapi/v3/asset/getUserAsset',
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

export type PostSapiV3AssetGetuserassetRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    needBtcValuation?: 'true' | 'false';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV3AssetGetuserassetResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV3AssetGetuserassetRequestResult = RequestResult<
  PostSapiV3AssetGetuserassetRequest,
  PostSapiV3AssetGetuserassetResponse
>;

export function postSapiV3AssetGetuserasset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV3AssetGetuserassetRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV3AssetGetuserassetRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV3AssetGetuserassetEndpointSchema, payload),
    config
  );
}
