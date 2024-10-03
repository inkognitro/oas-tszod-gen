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
import {OrderDetails, Error} from '@example-outputs/binance';

export const getApiV3AllordersEndpointSchema = {
  path: '/api/v3/allOrders',
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

export type GetApiV3AllordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3AllordersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AllordersRequestResult = RequestResult<
  GetApiV3AllordersRequest,
  GetApiV3AllordersResponse
>;

export function getApiV3Allorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AllordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AllordersRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AllordersEndpointSchema, payload),
    config
  );
}
