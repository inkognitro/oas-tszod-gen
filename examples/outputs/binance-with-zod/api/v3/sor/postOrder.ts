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

export const postOrderEndpointSchema = {
  path: '/api/v3/sor/order',
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
    timeInForce: z.enum(['GTC', 'IOC', 'FOK']).optional(),
    quantity: z.number().safe().finite(),
    price: z.number().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    strategyId: z.number().int().safe().finite().optional(),
    strategyType: z.number().int().safe().finite().optional(),
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
            fills: z.array(
              z.object({
                matchType: z.string(),
                price: z.string(),
                qty: z.string(),
                commission: z.string(),
                commissionAsset: z.string(),
                tradeId: z.number().int().safe().finite(),
                allocId: z.number().int().safe().finite(),
              })
            ),
            workingFloor: z.string(),
            selfTradePreventionMode: z.string(),
            usedSor: z.boolean(),
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

export type PostOrderRequest = RequestUnion<
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

export type PostOrderResponse =
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

export type PostOrderRequestResult = RequestResult<
  PostOrderRequest,
  PostOrderResponse
>;

export function postOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postOrderEndpointSchema, payload),
    config
  );
}
