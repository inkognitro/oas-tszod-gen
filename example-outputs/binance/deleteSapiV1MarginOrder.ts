import {MarginOrder, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const deleteSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
  method: 'delete',
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

export type DeleteSapiV1MarginOrderPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginOrderResponse =
  | Response<200, ResponseBodyData<'application/json', MarginOrder>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOrderRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginOrderResponse
>;

export function deleteSapiV1MarginOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1MarginOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginOrderEndpointSchema,
    }),
    config
  );
}
