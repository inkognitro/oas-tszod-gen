import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3OrderOcoEndpointSchema = {
  path: '/api/v3/order/oco',
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

export type PostApiV3OrderOcoPayload = {
  queryParams: {
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
  };
};

export type PostApiV3OrderOcoResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostApiV3OrderOcoRequestResult = RequestResult<
  Request,
  PostApiV3OrderOcoResponse
>;

export function postApiV3OrderOco(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3OrderOcoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderOcoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3OrderOcoEndpointSchema,
    }),
    config
  );
}
