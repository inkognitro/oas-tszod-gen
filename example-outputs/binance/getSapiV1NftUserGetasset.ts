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

export const getSapiV1NftUserGetassetEndpointSchema = {
  path: '/sapi/v1/nft/user/getAsset',
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

export type GetSapiV1NftUserGetassetRequest = RequestUnion<
  any,
  any,
  {
    limit?: number; // int
    page?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1NftUserGetassetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          list: {
            network: string;
            contractAddress: string;
            tokenId: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1NftUserGetassetRequestResult = RequestResult<
  GetSapiV1NftUserGetassetRequest,
  GetSapiV1NftUserGetassetResponse
>;

export function getSapiV1NftUserGetasset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1NftUserGetassetRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1NftUserGetassetRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1NftUserGetassetEndpointSchema, payload),
    config
  );
}
