import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3OrderCancelreplaceEndpointSchema = {
  path: '/api/v3/order/cancelReplace',
  method: 'post',
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

export type PostApiV3OrderCancelreplacePayload = {
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
    cancelReplaceMode: string;
    cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
    timeInForce?: 'GTC' | 'IOC' | 'FOK';
    quantity?: number;
    quoteOrderQty?: number;
    price?: number;
    cancelNewClientOrderId?: string;
    cancelOrigClientOrderId?: string;
    cancelOrderId?: number; // int
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

export type PostApiV3OrderCancelreplaceResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          cancelResult: string;
          newOrderResult: string;
          cancelResponse: {
            symbol: string;
            origClientOrderId: string;
            orderId: number; // int
            orderListId: number; // int
            clientOrderId: string;
            price: string;
            origQty: string;
            executedQty: string;
            cummulativeQuoteQty: string;
            status: string;
            timeInForce: string;
            type: string;
            side: string;
            selfTradePreventionMode: string;
            transactTime?: number; // int
          };
          newOrderResponse: {
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
            fills: string[];
            selfTradePreventionMode: string;
          };
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3OrderCancelreplaceRequestResult = RequestResult<
  Request,
  PostApiV3OrderCancelreplaceResponse
>;

export function postApiV3OrderCancelreplace(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3OrderCancelreplacePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderCancelreplaceRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3OrderCancelreplaceEndpointSchema,
    }),
    config
  );
}
