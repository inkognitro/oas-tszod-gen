import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const postOcoEndpointSchema = {
  path: '/sapi/v1/margin/order/oco',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    listClientOrderId: z.string().optional(),
    side: z.enum(['SELL', 'BUY']),
    quantity: z.number().safe().finite(),
    limitClientOrderId: z.string().optional(),
    price: z.number().safe().finite(),
    limitIcebergQty: z.number().safe().finite().optional(),
    stopClientOrderId: z.string().optional(),
    stopPrice: z.number().safe().finite(),
    stopLimitPrice: z.number().safe().finite().optional(),
    stopIcebergQty: z.number().safe().finite().optional(),
    stopLimitTimeInForce: z.enum(['GTC', 'FOK', 'IOC']).optional(),
    newOrderRespType: z.enum(['ACK', 'RESULT', 'FULL']).optional(),
    sideEffectType: z
      .enum(['NO_SIDE_EFFECT', 'MARGIN_BUY', 'AUTO_REPAY'])
      .optional(),
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
            marginBuyBorrowAmount: z.string(),
            marginBuyBorrowAsset: z.string(),
            isIsolated: z.boolean(),
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

export type PostOcoRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    listClientOrderId?: string;
    side: 'SELL' | 'BUY';
    quantity: number;
    limitClientOrderId?: string;
    price: number;
    limitIcebergQty?: number;
    stopClientOrderId?: string;
    stopPrice: number;
    stopLimitPrice?: number;
    stopIcebergQty?: number;
    stopLimitTimeInForce?: 'GTC' | 'FOK' | 'IOC';
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    sideEffectType?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY';
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
          marginBuyBorrowAmount: string;
          marginBuyBorrowAsset: string;
          isIsolated: boolean;
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
