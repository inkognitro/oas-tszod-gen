import {z_Order, z_OcoOrder, z_Error, Order, OcoOrder, Error} from '../../';
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

export const deleteOpenOrdersEndpointSchema = {
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
          zodSchema: z.array(z.union([z_Order, z_OcoOrder])),
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

export type DeleteOpenOrdersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteOpenOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((Order | OcoOrder) & (Partial<Order> & Partial<OcoOrder>))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteOpenOrdersRequestResult = RequestResult<
  DeleteOpenOrdersRequest,
  DeleteOpenOrdersResponse
>;

export function deleteOpenOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOpenOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOpenOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOpenOrdersEndpointSchema, payload),
    config
  );
}
