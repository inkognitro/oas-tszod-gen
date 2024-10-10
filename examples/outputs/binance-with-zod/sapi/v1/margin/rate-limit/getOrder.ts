import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getOrderEndpointSchema = {
  path: '/sapi/v1/margin/rateLimit/order',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetOrderRequest = RequestUnion<
  any,
  any,
  {
    isIsolated?: string;
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOrderResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOrderRequestResult = RequestResult<
  GetOrderRequest,
  GetOrderResponse
>;

export function getOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrderRequestResult> {
  return requestHandler.execute(
    createRequest(getOrderEndpointSchema, payload),
    config
  );
}
