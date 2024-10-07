import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const postApiV3OrderOcoEndpointSchema = {
  path: '/api/v3/order/oco',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    listClientOrderId: z.string().optional(),
    side: z.enum(['SELL', 'BUY']),
    quantity: z.number().safe().finite(),
    limitClientOrderId: z.string().optional(),
    limitStrategyId: z.number().int().safe().finite().optional(),
    limitStrategyType: z.number().int().safe().finite().optional(),
    price: z.number().safe().finite(),
    limitIcebergQty: z.number().safe().finite().optional(),
    trailingDelta: z.number().safe().finite().optional(),
    stopClientOrderId: z.string().optional(),
    stopPrice: z.number().safe().finite(),
    stopStrategyId: z.number().int().safe().finite().optional(),
    stopStrategyType: z.number().int().safe().finite().optional(),
    stopLimitPrice: z.number().safe().finite().optional(),
    stopIcebergQty: z.number().safe().finite().optional(),
    stopLimitTimeInForce: z.enum(['GTC', 'FOK', 'IOC']).optional(),
    newOrderRespType: z.enum(['ACK', 'RESULT', 'FULL']).optional(),
    selfTradePreventionMode: z
      .enum(['EXPIRE_TAKER', 'EXPIRE_MAKER', 'EXPIRE_BOTH', 'NONE'])
      .optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            orderListId: z.number().int().safe().finite(),
            contingencyType: z.string(),
            listStatusType: z.string(),
            listOrderStatus: z.string(),
            listClientOrderId: z.string(),
            transactionTime: z.number().int().safe().finite(),
            symbol: z.string(),
            orders: z.array(
              z.object({
                symbol: z.string(),
                orderId: z.number().int().safe().finite(),
                clientOrderId: z.string(),
              })
            ),
            orderReports: z.array(
              z.object({
                symbol: z.string(),
                orderId: z.number().int().safe().finite(),
                orderListId: z.number().int().safe().finite(),
                clientOrderId: z.string(),
                transactTime: z.number().int().safe().finite(),
                price: z.string(),
                origQty: z.string(),
                executedQty: z.string(),
                cummulativeQuoteQty: z.string(),
                status: z.string(),
                timeInForce: z.string(),
                type: z.string(),
                side: z.string(),
                stopPrice: z.string(),
                workingTime: z.string(),
                selfTradePreventionMode: z.string(),
              })
            ),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type PostApiV3OrderOcoRequest = RequestUnion<
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

export type PostApiV3OrderOcoResponse =
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

export type PostApiV3OrderOcoRequestResult = RequestResult<
  PostApiV3OrderOcoRequest,
  PostApiV3OrderOcoResponse
>;

export function postApiV3OrderOco(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApiV3OrderOcoRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderOcoRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3OrderOcoEndpointSchema, payload),
    config
  );
}
