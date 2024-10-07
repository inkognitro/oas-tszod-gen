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
import {MarginOrder, Error} from '@example-outputs/binance';

export const deleteSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
  method: 'delete',
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

export type DeleteSapiV1MarginOrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1MarginOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOrderRequestResult = RequestResult<
  DeleteSapiV1MarginOrderRequest,
  DeleteSapiV1MarginOrderResponse
>;

export function deleteSapiV1MarginOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteSapiV1MarginOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1MarginOrderEndpointSchema, payload),
    config
  );
}
