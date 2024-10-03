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

export const getSapiV1MarginAllpairsEndpointSchema = {
  path: '/sapi/v1/margin/allPairs',
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

export type GetSapiV1MarginAllpairsRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetSapiV1MarginAllpairsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          base: string;
          id: number; // int
          isBuyAllowed: boolean;
          isMarginTrade: boolean;
          isSellAllowed: boolean;
          quote: string;
          symbol: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllpairsRequestResult = RequestResult<
  GetSapiV1MarginAllpairsRequest,
  GetSapiV1MarginAllpairsResponse
>;

export function getSapiV1MarginAllpairs(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginAllpairsRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllpairsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAllpairsEndpointSchema, payload),
    config
  );
}
