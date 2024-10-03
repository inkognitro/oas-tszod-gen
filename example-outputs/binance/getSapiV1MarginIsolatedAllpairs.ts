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

export const getSapiV1MarginIsolatedAllpairsEndpointSchema = {
  path: '/sapi/v1/margin/isolated/allPairs',
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

export type GetSapiV1MarginIsolatedAllpairsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedAllpairsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          base: string;
          quote: string;
          isMarginTrade: boolean;
          isBuyAllowed: boolean;
          isSellAllowed: boolean;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedAllpairsRequestResult = RequestResult<
  GetSapiV1MarginIsolatedAllpairsRequest,
  GetSapiV1MarginIsolatedAllpairsResponse
>;

export function getSapiV1MarginIsolatedAllpairs(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginIsolatedAllpairsRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAllpairsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedAllpairsEndpointSchema, payload),
    config
  );
}
