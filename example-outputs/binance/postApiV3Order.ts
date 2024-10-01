import {
  OrderResponseAck,
  OrderResponseResult,
  OrderResponseFull,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
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

export type PostApiV3OrderPayload = {
  queryParams: {
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
    quantity?: number;
    quoteOrderQty?: number;
    price?: number;
    newClientOrderId?: string;
    strategyId?: number; // int
    strategyType?: number; // int
    stopPrice?: number;
    trailingDelta?: number;
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    selfTradePreventionMode?:
      | 'EXPIRE_TAKER'
      | 'EXPIRE_MAKER'
      | 'EXPIRE_BOTH'
      | 'NONE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostApiV3OrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        OrderResponseAck | OrderResponseResult | OrderResponseFull
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3OrderRequestResult = RequestResult<
  Request,
  PostApiV3OrderResponse
>;

export function postApiV3Order(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3OrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: postApiV3OrderEndpointSchema}),
    config
  );
}
