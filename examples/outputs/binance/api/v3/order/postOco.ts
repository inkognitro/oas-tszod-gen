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

export const postOcoEndpointSchema = {
  path: '/api/v3/order/oco',
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

export type PostOcoRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    listClientOrderId?: string;
    side: 'SELL' | 'BUY';
    quantity: number;
    limitClientOrderId?: string;
    limitStrategyId?: number; // int
    limitStrategyType?: number; // int
    price: number;
    limitIcebergQty?: number;
    trailingDelta?: number;
    stopClientOrderId?: string;
    stopPrice: number;
    stopStrategyId?: number; // int
    stopStrategyType?: number; // int
    stopLimitPrice?: number;
    stopIcebergQty?: number;
    stopLimitTimeInForce?: 'GTC' | 'FOK' | 'IOC';
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

export type PostOcoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderListId: number; // int
          contingencyType: string;
          listStatusType: string;
          listOrderStatus: string;
          listClientOrderId: string;
          transactionTime: number; // int
          symbol: string;
          orders: {
            symbol: string;
            orderId: number; // int
            clientOrderId: string;
          }[];
          orderReports: {
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
            stopPrice: string;
            workingTime: string;
            selfTradePreventionMode: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostOcoRequestResult = RequestResult<
  PostOcoRequest,
  PostOcoResponse
>;

export function postOco(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostOcoRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostOcoRequestResult> {
  return requestHandler.execute(
    createRequest(postOcoEndpointSchema, payload),
    config
  );
}
