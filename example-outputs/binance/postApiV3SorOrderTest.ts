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
import {Error} from '@example-outputs/binance';

export const postApiV3SorOrderTestEndpointSchema = {
  path: '/api/v3/sor/order/test',
  method: 'post',
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

export type PostApiV3SorOrderTestRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    type:
      | 'LIMIT'
      | 'MARKET'
      | 'STOP_LOSS'
      | 'STOP_LOSS_LIMIT'
      | 'TAKE_PROFIT'
      | 'TAKE_PROFIT_LIMIT'
      | 'LIMIT_MAKER';
    timeInForce?: 'GTC' | 'IOC' | 'FOK';
    quantity: number;
    price?: number;
    newClientOrderId?: string;
    strategyId?: number; // int
    strategyType?: number; // int
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    selfTradePreventionMode?:
      | 'EXPIRE_TAKER'
      | 'EXPIRE_MAKER'
      | 'EXPIRE_BOTH'
      | 'NONE';
    computeCommissionRates?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostApiV3SorOrderTestResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3SorOrderTestRequestResult = RequestResult<
  PostApiV3SorOrderTestRequest,
  PostApiV3SorOrderTestResponse
>;

export function postApiV3SorOrderTest(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApiV3SorOrderTestRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3SorOrderTestRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3SorOrderTestEndpointSchema, payload),
    config
  );
}
