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

export const getAssetDividendEndpointSchema = {
  path: '/sapi/v1/asset/assetDividend',
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

export type GetAssetDividendRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetDividendResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            id: number; // int
            amount: string;
            asset: string;
            divTime: number; // int
            enInfo: string;
            tranId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetDividendRequestResult = RequestResult<
  GetAssetDividendRequest,
  GetAssetDividendResponse
>;

export function getAssetDividend(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetDividendRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetDividendRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetDividendEndpointSchema, payload),
    config
  );
}
