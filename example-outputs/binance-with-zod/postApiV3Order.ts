import {
  z_OrderResponseAck,
  z_OrderResponseResult,
  z_OrderResponseFull,
  z_Error,
  OrderResponseAck,
  OrderResponseResult,
  OrderResponseFull,
  Error,
} from '@example-outputs/binance-with-zod';
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

export const postApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
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
    quantity: z.number().safe().finite().optional(),
    quoteOrderQty: z.number().safe().finite().optional(),
    price: z.number().safe().finite().optional(),
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
          zodSchema: z.union([
            z_OrderResponseAck,
            z_OrderResponseResult,
            z_OrderResponseFull,
          ]),
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

export type PostApiV3OrderRequest = RequestUnion<
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
  }
>;

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
  PostApiV3OrderRequest,
  PostApiV3OrderResponse
>;

export function postApiV3Order(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApiV3OrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3OrderEndpointSchema, payload),
    config
  );
}
