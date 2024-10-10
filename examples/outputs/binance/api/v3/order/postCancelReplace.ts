import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const postCancelReplaceEndpointSchema = {
  path: '/api/v3/order/cancelReplace',
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

export type PostCancelReplaceRequest = RequestUnion<
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
  }
>;

export type PostCancelReplaceResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCancelReplaceRequestResult = RequestResult<
  PostCancelReplaceRequest,
  PostCancelReplaceResponse
>;

export function postCancelReplace(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCancelReplaceRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCancelReplaceRequestResult> {
  return requestHandler.execute(
    createRequest(postCancelReplaceEndpointSchema, payload),
    config
  );
}
