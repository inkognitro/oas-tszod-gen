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

export const getSapiV1MarginAllordersEndpointSchema = {
  path: '/sapi/v1/margin/allOrders',
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

export type GetSapiV1MarginAllordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginAllordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', MarginOrderDetail[]>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllordersRequestResult = RequestResult<
  GetSapiV1MarginAllordersRequest,
  GetSapiV1MarginAllordersResponse
>;

export function getSapiV1MarginAllorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginAllordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAllordersEndpointSchema, payload),
    config
  );
}
