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

export const getSapiV1MarginRatelimitOrderEndpointSchema = {
  path: '/sapi/v1/margin/rateLimit/order',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    isIsolated: z.string().optional(),
    symbol: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              rateLimitType: z.string(),
              interval: z.string(),
              intervalNum: z.number().int().safe().finite(),
              limit: z.number().int().safe().finite(),
              count: z.number().int().safe().finite(),
            })
          ),
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

export type GetSapiV1MarginRatelimitOrderPayload = {
  queryParams: {
    isIsolated?: string;
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginRatelimitOrderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rateLimitType: string;
          interval: string;
          intervalNum: number; // int
          limit: number; // int
          count: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginRatelimitOrderRequestResult = RequestResult<
  Request,
  GetSapiV1MarginRatelimitOrderResponse
>;

export function getSapiV1MarginRatelimitOrder(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginRatelimitOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginRatelimitOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginRatelimitOrderEndpointSchema,
    }),
    config
  );
}
