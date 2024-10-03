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

export const getSapiV1MarginIsolatedmargintierEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginTier',
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

export type GetSapiV1MarginIsolatedmargintierRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    tier?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedmargintierResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol?: string;
          tier?: number; // int
          effectiveMultiple?: string;
          initialRiskRatio?: string;
          liquidationRiskRatio?: string;
          baseAssetMaxBorrowable?: string;
          quoteAssetMaxBorrowable?: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedmargintierRequestResult = RequestResult<
  GetSapiV1MarginIsolatedmargintierRequest,
  GetSapiV1MarginIsolatedmargintierResponse
>;

export function getSapiV1MarginIsolatedmargintier(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginIsolatedmargintierRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargintierRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedmargintierEndpointSchema, payload),
    config
  );
}
