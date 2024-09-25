import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postApiV3SorOrderEndpointSchema = {
  path: '/api/v3/sor/order',
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
    quantity: z.number().safe().finite(),
    price: z.number().safe().finite().optional(),
    newClientOrderId: z.string().optional(),
    strategyId: z.number().int().safe().finite().optional(),
    strategyType: z.number().int().safe().finite().optional(),
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

export type PostApiV3SorOrderPayload = {
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
  };
};

export type PostApiV3SorOrderResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostApiV3SorOrderRequestResult = RequestResult<
  Request,
  PostApiV3SorOrderResponse
>;

export function postApiV3SorOrder(
  requestHandler: RequestHandler,
  payload: PostApiV3SorOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3SorOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3SorOrderEndpointSchema,
    }),
    config
  );
}
