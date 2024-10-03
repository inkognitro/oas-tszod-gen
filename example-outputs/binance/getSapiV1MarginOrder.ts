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
import {MarginOrderDetail, Error} from '@example-outputs/binance';

export const getSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
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

export type GetSapiV1MarginOrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOrderDetail>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOrderRequestResult = RequestResult<
  GetSapiV1MarginOrderRequest,
  GetSapiV1MarginOrderResponse
>;

export function getSapiV1MarginOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginOrderRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginOrderEndpointSchema, payload),
    config
  );
}
