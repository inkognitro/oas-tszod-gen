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

export const getSapiV1MarginOpenordersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
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

export type GetSapiV1MarginOpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', MarginOrderDetail[]>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOpenordersRequestResult = RequestResult<
  GetSapiV1MarginOpenordersRequest,
  GetSapiV1MarginOpenordersResponse
>;

export function getSapiV1MarginOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginOpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginOpenordersEndpointSchema, payload),
    config
  );
}
