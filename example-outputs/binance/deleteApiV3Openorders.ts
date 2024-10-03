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
import {Order, OcoOrder, Error} from '@example-outputs/binance';

export const deleteApiV3OpenordersEndpointSchema = {
  path: '/api/v3/openOrders',
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

export type DeleteApiV3OpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteApiV3OpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((Partial<Order> | Partial<OcoOrder>) & (Order | OcoOrder))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3OpenordersRequestResult = RequestResult<
  DeleteApiV3OpenordersRequest,
  DeleteApiV3OpenordersResponse
>;

export function deleteApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteApiV3OpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApiV3OpenordersEndpointSchema, payload),
    config
  );
}
