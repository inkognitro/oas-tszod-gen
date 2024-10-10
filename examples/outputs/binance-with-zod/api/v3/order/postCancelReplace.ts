import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const postCancelReplaceEndpointSchema = {
  path: '/api/v3/order/cancelReplace',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.enum(['SELL', 'BUY']),
    type: z.enum([
      'LIMIT',
      'MARKET',
      'STOP_LOSS',
      'STOP_LOSS_LIMIT',
      'TAKE_PROFIT',
      'TAKE_PROFIT_LIMIT',
      'LIMIT_MAKER',
    ]),
    cancelReplaceMode: z.string(),
    cancelRestrictions: z
      .enum(['ONLY_NEW', 'ONLY_PARTIALLY_FILLED'])
      .optional(),
    timeInForce: z.enum(['GTC', 'IOC', 'FOK']).optional(),
    quantity: z.number().safe().finite().optional(),
    quoteOrderQty: z.number().safe().finite().optional(),
    price: z.number().safe().finite().optional(),
    cancelNewClientOrderId: z.string().optional(),
    cancelOrigClientOrderId: z.string().optional(),
    cancelOrderId: z.number().int().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    strategyId: z.number().int().safe().finite().optional(),
    strategyType: z.number().int().safe().finite().optional(),
    stopPrice: z.number().safe().finite().optional(),
    trailingDelta: z.number().safe().finite().optional(),
    icebergQty: z.number().safe().finite().optional(),
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
            cancelResult: z.string(),
            newOrderResult: z.string(),
            cancelResponse: z.object({
              symbol: z.string(),
              origClientOrderId: z.string(),
              orderId: z.number().int().safe().finite(),
              orderListId: z.number().int().safe().finite(),
              clientOrderId: z.string(),
              price: z.string(),
              origQty: z.string(),
              executedQty: z.string(),
              cummulativeQuoteQty: z.string(),
              status: z.string(),
              timeInForce: z.string(),
              type: z.string(),
              side: z.string(),
              selfTradePreventionMode: z.string(),
              transactTime: z.number().int().safe().finite().optional(),
            }),
            newOrderResponse: z.object({
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
              workingTime: z.number().int().safe().finite(),
              fills: z.array(z.string()),
              selfTradePreventionMode: z.string(),
            }),
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
