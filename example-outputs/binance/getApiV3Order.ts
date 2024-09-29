import {OrderDetails, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3OrderPayload = {
  queryParams: {
    symbol: string;
    orderId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3OrderResponse =
  | Response<200, ResponseBodyData<'application/json', OrderDetails>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3OrderRequestResult = RequestResult<
  Request,
  GetApiV3OrderResponse
>;

export function getApiV3Order(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3OrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3OrderEndpointSchema}),
    config
  );
}
