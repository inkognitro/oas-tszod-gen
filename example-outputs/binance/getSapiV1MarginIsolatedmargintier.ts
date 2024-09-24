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

export const getSapiV1MarginIsolatedmargintierEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginTier',
  method: 'get',
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

export type GetSapiV1MarginIsolatedmargintierPayload = {
  queryParams: {
    symbol: string;
    tier?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedmargintierResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginIsolatedmargintierRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedmargintierResponse
>;

export function getSapiV1MarginIsolatedmargintier(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginIsolatedmargintierPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargintierRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedmargintierEndpointSchema,
    }),
    config
  );
}
