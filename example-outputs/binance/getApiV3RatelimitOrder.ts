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

export const getApiV3RatelimitOrderEndpointSchema = {
  path: '/api/v3/rateLimit/order',
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

export type GetApiV3RatelimitOrderPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3RatelimitOrderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rateLimitType: string;
          interval: string;
          intervalNum: number; // int
          limit: number; // int
          count?: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3RatelimitOrderRequestResult = RequestResult<
  Request,
  GetApiV3RatelimitOrderResponse
>;

export function getApiV3RatelimitOrder(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3RatelimitOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3RatelimitOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3RatelimitOrderEndpointSchema,
    }),
    config
  );
}
