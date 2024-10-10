import {
  z_MarginOrderResponseAck,
  z_MarginOrderResponseResult,
  z_MarginOrderResponseFull,
  z_Error,
  MarginOrderResponseAck,
  MarginOrderResponseResult,
  MarginOrderResponseFull,
  Error,
} from '../../../';
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
  path: '/sapi/v1/margin/order',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
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
    quantity: z.number().safe().finite(),
    quoteOrderQty: z.number().safe().finite().optional(),
    price: z.number().safe().finite().optional(),
    stopPrice: z.number().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    icebergQty: z.number().safe().finite().optional(),
    newOrderRespType: z.enum(['ACK', 'RESULT', 'FULL']).optional(),
    sideEffectType: z
      .enum(['NO_SIDE_EFFECT', 'MARGIN_BUY', 'AUTO_REPAY'])
      .optional(),
    timeInForce: z.enum(['GTC', 'IOC', 'FOK']).optional(),
    autoRepayAtCancel: z.boolean(),
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
            z_MarginOrderResponseAck,
            z_MarginOrderResponseResult,
            z_MarginOrderResponseFull,
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

export type PostOrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    side: 'SELL' | 'BUY';
    type:
      | 'LIMIT'
      | 'MARKET'
      | 'STOP_LOSS'
      | 'STOP_LOSS_LIMIT'
      | 'TAKE_PROFIT'
      | 'TAKE_PROFIT_LIMIT'
      | 'LIMIT_MAKER';
    quantity: number;
    quoteOrderQty?: number;
    price?: number;
    stopPrice?: number;
    newClientOrderId?: string;
    icebergQty?: number;
    newOrderRespType?: 'ACK' | 'RESULT' | 'FULL';
    sideEffectType?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY';
    timeInForce?: 'GTC' | 'IOC' | 'FOK';
    autoRepayAtCancel: boolean;
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
        | MarginOrderResponseAck
        | MarginOrderResponseResult
        | MarginOrderResponseFull
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
