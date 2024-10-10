import {z_OrderDetails, z_Error, OrderDetails, Error} from '../../';
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
} from '../../core';

export const getOrderEndpointSchema = {
  path: '/api/v3/order',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    orderId: z.number().int().safe().finite().optional(),
    origClientOrderId: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_OrderDetails,
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
    symbol: string;
    orderId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails>>
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
