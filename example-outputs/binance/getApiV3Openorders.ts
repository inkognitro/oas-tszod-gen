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

export const getApiV3OpenordersEndpointSchema = {
  path: '/api/v3/openOrders',
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

export type GetApiV3OpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3OpenordersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3OpenordersRequestResult = RequestResult<
  GetApiV3OpenordersRequest,
  GetApiV3OpenordersResponse
>;

export function getApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3OpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3OpenordersEndpointSchema, payload),
    config
  );
}
