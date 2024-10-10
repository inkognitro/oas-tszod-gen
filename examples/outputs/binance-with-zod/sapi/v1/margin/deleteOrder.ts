import {z_MarginOrder, z_Error, MarginOrder, Error} from '../../../';
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

export const deleteOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    orderId: z.number().int().safe().finite().optional(),
    origClientOrderId: z.string().optional(),
    newClientOrderId: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_MarginOrder,
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

export type DeleteOrderRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteOrderRequestResult = RequestResult<
  DeleteOrderRequest,
  DeleteOrderResponse
>;

export function deleteOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOrderRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOrderEndpointSchema, payload),
    config
  );
}
