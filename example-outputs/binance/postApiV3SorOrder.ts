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

export const postApiV3SorOrderEndpointSchema = {
  path: '/api/v3/sor/order',
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

export type PostApiV3SorOrderRequest = RequestUnion<
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
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostApiV3SorOrderResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          orderId: number; // int
          orderListId: number; // int
          clientOrderId: string;
          transactTime: number; // int
          price: string;
          origQty: string;
          executedQty: string;
          cummulativeQuoteQty: string;
          status: string;
          timeInForce: string;
          type: string;
          side: string;
          workingTime: number; // int
          fills: {
            matchType: string;
            price: string;
            qty: string;
            commission: string;
            commissionAsset: string;
            tradeId: number; // int
            allocId: number; // int
          }[];
          workingFloor: string;
          selfTradePreventionMode: string;
          usedSor: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3SorOrderRequestResult = RequestResult<
  PostApiV3SorOrderRequest,
  PostApiV3SorOrderResponse
>;

export function postApiV3SorOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApiV3SorOrderRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3SorOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3SorOrderEndpointSchema, payload),
    config
  );
}
