import {
  marginOrderResponseAckZodSchema,
  marginOrderResponseResultZodSchema,
  marginOrderResponseFullZodSchema,
  errorZodSchema,
  MarginOrderResponseAck,
  MarginOrderResponseResult,
  MarginOrderResponseFull,
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

export const postSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.union([z.literal('TRUE'), z.literal('FALSE')]).optional(),
    side: z.union([z.literal('SELL'), z.literal('BUY')]),
    type: z.union([
      z.literal('LIMIT'),
      z.literal('MARKET'),
      z.literal('STOP_LOSS'),
      z.literal('STOP_LOSS_LIMIT'),
      z.literal('TAKE_PROFIT'),
      z.literal('TAKE_PROFIT_LIMIT'),
      z.literal('LIMIT_MAKER'),
    ]),
    quantity: z.number().safe().finite(),
    quoteOrderQty: z.number().safe().finite().optional(),
    price: z.number().safe().finite().optional(),
    stopPrice: z.number().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    icebergQty: z.number().safe().finite().optional(),
    newOrderRespType: z
      .union([z.literal('ACK'), z.literal('RESULT'), z.literal('FULL')])
      .optional(),
    sideEffectType: z
      .union([
        z.literal('NO_SIDE_EFFECT'),
        z.literal('MARGIN_BUY'),
        z.literal('AUTO_REPAY'),
      ])
      .optional(),
    timeInForce: z
      .union([z.literal('GTC'), z.literal('IOC'), z.literal('FOK')])
      .optional(),
    autoRepayAtCancel: z.boolean(),
    selfTradePreventionMode: z
      .union([
        z.literal('EXPIRE_TAKER'),
        z.literal('EXPIRE_MAKER'),
        z.literal('EXPIRE_BOTH'),
        z.literal('NONE'),
      ])
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
            marginOrderResponseAckZodSchema,
            marginOrderResponseResultZodSchema,
            marginOrderResponseFullZodSchema,
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

export type PostSapiV1MarginOrderPayload = {
  queryParams: {
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
  };
};

export type PostSapiV1MarginOrderResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          | MarginOrderResponseAck
          | MarginOrderResponseResult
          | MarginOrderResponseFull
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MarginOrderRequestResult = RequestResult<
  Request,
  PostSapiV1MarginOrderResponse
>;

export function postSapiV1MarginOrder(
  requestHandler: RequestHandler,
  payload: PostSapiV1MarginOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginOrderEndpointSchema,
    }),
    config
  );
}
