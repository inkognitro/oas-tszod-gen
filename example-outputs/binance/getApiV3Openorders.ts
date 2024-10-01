import {OrderDetails, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetApiV3OpenordersPayload = {
  queryParams: {
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3OpenordersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3OpenordersRequestResult = RequestResult<
  Request,
  GetApiV3OpenordersResponse
>;

export function getApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3OpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3OpenordersEndpointSchema,
    }),
    config
  );
}
