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

export const postSapiV1AlgoFuturesNewordertwapEndpointSchema = {
  path: '/sapi/v1/algo/futures/newOrderTwap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.union([z.literal('SELL'), z.literal('BUY')]),
    positionSide: z
      .union([z.literal('BOTH'), z.literal('LONG'), z.literal('SHORT')])
      .optional(),
    quantity: z.number().safe().finite(),
    duration: z.number().int().safe().finite(),
    clientAlgoId: z.string().optional(),
    reduceOnly: z.boolean().optional(),
    limitPrice: z.number().safe().finite().optional(),
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
            clientAlgoId: z.string(),
            success: z.boolean(),
            code: z.number().int().safe().finite(),
            msg: z.string(),
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

export type PostSapiV1AlgoFuturesNewordertwapPayload = {
  queryParams: {
    symbol: string;
    side: 'SELL' | 'BUY';
    positionSide?: 'BOTH' | 'LONG' | 'SHORT';
    quantity: number;
    duration: number; // int
    clientAlgoId?: string;
    reduceOnly?: boolean;
    limitPrice?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AlgoFuturesNewordertwapResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            clientAlgoId: string;
            success: boolean;
            code: number; // int
            msg: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1AlgoFuturesNewordertwapRequestResult = RequestResult<
  Request,
  PostSapiV1AlgoFuturesNewordertwapResponse
>;

export function postSapiV1AlgoFuturesNewordertwap(
  requestHandler: RequestHandler,
  payload: PostSapiV1AlgoFuturesNewordertwapPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AlgoFuturesNewordertwapRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AlgoFuturesNewordertwapEndpointSchema,
    }),
    config
  );
}
