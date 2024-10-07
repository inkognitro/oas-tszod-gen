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
import {
  CanceledMarginOrderDetail,
  MarginOcoOrder,
  Error,
} from '@example-outputs/binance';

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

export type DeleteSapiV1MarginOpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1MarginOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((Partial<CanceledMarginOrderDetail> | Partial<MarginOcoOrder>) &
          (CanceledMarginOrderDetail | MarginOcoOrder))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOpenordersRequestResult = RequestResult<
  DeleteSapiV1MarginOpenordersRequest,
  DeleteSapiV1MarginOpenordersResponse
>;

export function deleteSapiV1MarginOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSapiV1MarginOpenordersRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1MarginOpenordersEndpointSchema, payload),
    config
  );
}
