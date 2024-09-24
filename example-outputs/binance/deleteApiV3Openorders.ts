import {Order, OcoOrder, Error} from '@example-outputs/binance';
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

export const deleteApiV3OpenordersEndpointSchema = {
  path: '/api/v3/openOrders',
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

export type DeleteApiV3OpenordersPayload = {
  queryParams: {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteApiV3OpenordersResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          ((Partial<Order> | Partial<OcoOrder>) & (Order | OcoOrder))[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteApiV3OpenordersRequestResult = RequestResult<
  Request,
  DeleteApiV3OpenordersResponse
>;

export function deleteApiV3Openorders(
  requestHandler: RequestHandler,
  payload: DeleteApiV3OpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteApiV3OpenordersEndpointSchema,
    }),
    config
  );
}
