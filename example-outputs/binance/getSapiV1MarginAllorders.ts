import {MarginOrderDetail, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginAllordersEndpointSchema = {
  path: '/sapi/v1/margin/allOrders',
  method: 'get',
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

export type GetSapiV1MarginAllordersPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginAllordersResponse =
  | Response<200, ResponseBodyData<'application/json', MarginOrderDetail[]>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllordersRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAllordersResponse
>;

export function getSapiV1MarginAllorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginAllordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAllordersEndpointSchema,
    }),
    config
  );
}
