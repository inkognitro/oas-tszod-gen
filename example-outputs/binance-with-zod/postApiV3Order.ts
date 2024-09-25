import {
  orderResponseAckZodSchema,
  orderResponseResultZodSchema,
  orderResponseFullZodSchema,
  errorZodSchema,
  OrderResponseAck,
  OrderResponseResult,
  OrderResponseFull,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.enum('SELL', 'BUY'),
    type: z.enum(
      'LIMIT',
      'MARKET',
      'STOP_LOSS',
      'STOP_LOSS_LIMIT',
      'TAKE_PROFIT',
      'TAKE_PROFIT_LIMIT',
      'LIMIT_MAKER'
    ),
    timeInForce: z.enum('GTC', 'IOC', 'FOK').optional(),
    quantity: z.number().safe().finite().optional(),
    quoteOrderQty: z.number().safe().finite().optional(),
    price: z.number().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    strategyId: z.number().int().safe().finite().optional(),
    strategyType: z.number().int().safe().finite().optional(),
    stopPrice: z.number().safe().finite().optional(),
    trailingDelta: z.number().safe().finite().optional(),
    icebergQty: z.number().safe().finite().optional(),
    newOrderRespType: z.enum('ACK', 'RESULT', 'FULL').optional(),
    selfTradePreventionMode: z
      .enum('EXPIRE_TAKER', 'EXPIRE_MAKER', 'EXPIRE_BOTH', 'NONE')
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
            orderResponseAckZodSchema,
            orderResponseResultZodSchema,
            orderResponseFullZodSchema,
          ]),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostApiV3OrderPayload = {
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
  };
};

export type PostApiV3OrderResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          OrderResponseAck | OrderResponseResult | OrderResponseFull
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostApiV3OrderRequestResult = RequestResult<
  Request,
  PostApiV3OrderResponse
>;

export function postApiV3Order(
  requestHandler: RequestHandler,
  payload: PostApiV3OrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: postApiV3OrderEndpointSchema}),
    config
  );
}
