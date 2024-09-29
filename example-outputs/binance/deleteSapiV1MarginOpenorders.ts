import {
  CanceledMarginOrderDetail,
  MarginOcoOrder,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const deleteSapiV1MarginOpenordersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
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

export type DeleteSapiV1MarginOpenordersPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginOpenordersResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        ((Partial<CanceledMarginOrderDetail> | Partial<MarginOcoOrder>) &
          (CanceledMarginOrderDetail | MarginOcoOrder))[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOpenordersRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginOpenordersResponse
>;

export function deleteSapiV1MarginOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1MarginOpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginOpenordersEndpointSchema,
    }),
    config
  );
}
