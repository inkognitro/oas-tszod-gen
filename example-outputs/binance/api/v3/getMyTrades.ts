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
import {MyTrade, Error} from '@example-outputs/binance';

export const getMyTradesEndpointSchema = {
  path: '/api/v3/myTrades',
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

export type GetMyTradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetMyTradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MyTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetMyTradesRequestResult = RequestResult<
  GetMyTradesRequest,
  GetMyTradesResponse
>;

export function getMyTrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMyTradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMyTradesRequestResult> {
  return requestHandler.execute(
    createRequest(getMyTradesEndpointSchema, payload),
    config
  );
}
