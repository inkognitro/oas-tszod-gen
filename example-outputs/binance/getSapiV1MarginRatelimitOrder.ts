import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginRatelimitOrderEndpointSchema = {
  path: '/sapi/v1/margin/rateLimit/order',
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

export type GetSapiV1MarginRatelimitOrderPayload = {
  queryParams: {
    isIsolated?: string;
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginRatelimitOrderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rateLimitType: string;
          interval: string;
          intervalNum: number; // int
          limit: number; // int
          count: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginRatelimitOrderRequestResult = RequestResult<
  Request,
  GetSapiV1MarginRatelimitOrderResponse
>;

export function getSapiV1MarginRatelimitOrder(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginRatelimitOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginRatelimitOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginRatelimitOrderEndpointSchema,
    }),
    config
  );
}
