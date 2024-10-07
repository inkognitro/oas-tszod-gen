import {
  z_Order,
  z_OcoOrder,
  z_Error,
  Order,
  OcoOrder,
  Error,
} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const deleteApiV3OpenordersEndpointSchema = {
  path: '/api/v3/openOrders',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
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
            z.intersection(
              z.union([z_Order.partial(), z_OcoOrder.partial()]),
              z.union([z_Order, z_OcoOrder])
            )
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

export type DeleteApiV3OpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteApiV3OpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((Partial<Order> | Partial<OcoOrder>) & (Order | OcoOrder))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3OpenordersRequestResult = RequestResult<
  DeleteApiV3OpenordersRequest,
  DeleteApiV3OpenordersResponse
>;

export function deleteApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteApiV3OpenordersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApiV3OpenordersEndpointSchema, payload),
    config
  );
}
