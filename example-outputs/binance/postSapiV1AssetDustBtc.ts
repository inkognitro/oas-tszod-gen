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

export const postSapiV1AssetDustBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
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

export type PostSapiV1AssetDustBtcPayload = {
  queryParams: {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetDustBtcResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            details: {
              asset: string;
              assetFullName: string;
              amountFree: string;
              toBTC: string;
              toBNB: string;
              toBNBOffExchange: string;
              exchange: string;
            }[];
            totalTransferBtc: string;
            totalTransferBNB: string;
            dribbletPercentage: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AssetDustBtcRequestResult = RequestResult<
  Request,
  PostSapiV1AssetDustBtcResponse
>;

export function postSapiV1AssetDustBtc(
  requestHandler: RequestHandler,
  payload: PostSapiV1AssetDustBtcPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetDustBtcRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetDustBtcEndpointSchema,
    }),
    config
  );
}
