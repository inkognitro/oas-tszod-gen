import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postApiV3SorOrderTestEndpointSchema = {
  path: '/api/v3/sor/order/test',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
    computeCommissionRates: z.boolean().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
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

export type PostApiV3SorOrderTestPayload = {
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
    computeCommissionRates?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostApiV3SorOrderTestResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostApiV3SorOrderTestRequestResult = RequestResult<
  Request,
  PostApiV3SorOrderTestResponse
>;

export function postApiV3SorOrderTest(
  requestHandler: SimpleRequestHandler,
  payload: PostApiV3SorOrderTestPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3SorOrderTestRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postApiV3SorOrderTestEndpointSchema,
    }),
    config
  );
}
