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

export const getApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
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

export type GetApiV3OrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3OrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3OrderRequestResult = RequestResult<
  GetApiV3OrderRequest,
  GetApiV3OrderResponse
>;

export function getApiV3Order(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3OrderRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3OrderEndpointSchema, payload),
    config
  );
}
