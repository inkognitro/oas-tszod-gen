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
import {Order, Error} from '@example-outputs/binance';

export const deleteApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
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

export type DeleteApiV3OrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteApiV3OrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Order>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3OrderRequestResult = RequestResult<
  DeleteApiV3OrderRequest,
  DeleteApiV3OrderResponse
>;

export function deleteApiV3Order(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteApiV3OrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApiV3OrderEndpointSchema, payload),
    config
  );
}
