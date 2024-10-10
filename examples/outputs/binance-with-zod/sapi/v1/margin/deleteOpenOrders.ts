import {
  z_CanceledMarginOrderDetail,
  z_MarginOcoOrder,
  z_Error,
  CanceledMarginOrderDetail,
  MarginOcoOrder,
  Error,
} from '../../../';
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

export const deleteOpenOrdersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
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
            z.union([z_CanceledMarginOrderDetail, z_MarginOcoOrder])
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

export type DeleteOpenOrdersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
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
        ((CanceledMarginOrderDetail | MarginOcoOrder) &
          (Partial<CanceledMarginOrderDetail> & Partial<MarginOcoOrder>))[]
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
