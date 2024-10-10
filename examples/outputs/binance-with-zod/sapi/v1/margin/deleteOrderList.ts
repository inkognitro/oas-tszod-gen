import {z_MarginOcoOrder, z_Error, MarginOcoOrder, Error} from '../../../';
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

export const deleteOrderListEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    orderListId: z.number().int().safe().finite().optional(),
    listClientOrderId: z.string().optional(),
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
          zodSchema: z_MarginOcoOrder,
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

export type DeleteOrderListRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteOrderListResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOcoOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteOrderListRequestResult = RequestResult<
  DeleteOrderListRequest,
  DeleteOrderListResponse
>;

export function deleteOrderList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOrderListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOrderListRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOrderListEndpointSchema, payload),
    config
  );
}
