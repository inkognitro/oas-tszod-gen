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

export const postSapiV1AssetDustBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
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

export type PostSapiV1AssetDustBtcPayload = {
  queryParams: {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetDustBtcResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetDustBtcRequestResult = RequestResult<
  Request,
  PostSapiV1AssetDustBtcResponse
>;

export function postSapiV1AssetDustBtc(
  requestHandler: SimpleRequestHandler,
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
