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

export const postSapiV1MarginOrderOcoEndpointSchema = {
  path: '/sapi/v1/margin/order/oco',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.union([z.literal('TRUE'), z.literal('FALSE')]).optional(),
    listClientOrderId: z.string().optional(),
    side: z.union([z.literal('SELL'), z.literal('BUY')]),
    quantity: z.number().safe().finite(),
    limitClientOrderId: z.string().optional(),
    price: z.number().safe().finite(),
    limitIcebergQty: z.number().safe().finite().optional(),
    stopClientOrderId: z.string().optional(),
    stopPrice: z.number().safe().finite(),
    stopLimitPrice: z.number().safe().finite().optional(),
    stopIcebergQty: z.number().safe().finite().optional(),
    stopLimitTimeInForce: z
      .union([z.literal('GTC'), z.literal('FOK'), z.literal('IOC')])
      .optional(),
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

export type PostSapiV1MarginOrderOcoPayload = {
  queryParams: {
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
  };
};

export type PostSapiV1MarginOrderOcoResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MarginOrderOcoRequestResult = RequestResult<
  Request,
  PostSapiV1MarginOrderOcoResponse
>;

export function postSapiV1MarginOrderOco(
  requestHandler: RequestHandler,
  payload: PostSapiV1MarginOrderOcoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginOrderOcoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginOrderOcoEndpointSchema,
    }),
    config
  );
}
