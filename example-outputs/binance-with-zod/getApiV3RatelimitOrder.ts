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

export const getApiV3RatelimitOrderEndpointSchema = {
  path: '/api/v3/rateLimit/order',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
              count: z.number().int().safe().finite().optional(),
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

export type GetApiV3RatelimitOrderPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3RatelimitOrderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rateLimitType: string;
          interval: string;
          intervalNum: number; // int
          limit: number; // int
          count?: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3RatelimitOrderRequestResult = RequestResult<
  Request,
  GetApiV3RatelimitOrderResponse
>;

export function getApiV3RatelimitOrder(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3RatelimitOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3RatelimitOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3RatelimitOrderEndpointSchema,
    }),
    config
  );
}
