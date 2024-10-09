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

export const getAllAssetsEndpointSchema = {
  path: '/sapi/v1/margin/allAssets',
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
  },
};

export type GetAllAssetsRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
  }
>;

export type GetAllAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          assetFullName: string;
          assetName: string;
          isBorrowable: boolean;
          isMortgageable: boolean;
          userMinBorrow: string;
          userMinRepay: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAllAssetsRequestResult = RequestResult<
  GetAllAssetsRequest,
  GetAllAssetsResponse
>;

export function getAllAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAllAssetsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAllAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getAllAssetsEndpointSchema, payload),
    config
  );
}
