import {
  z_MarginOrderDetail,
  z_Error,
  MarginOrderDetail,
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

export const getOpenOrdersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
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
          zodSchema: z.array(z_MarginOrderDetail),
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

export type GetOpenOrdersRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOpenOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', MarginOrderDetail[]>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOpenOrdersRequestResult = RequestResult<
  GetOpenOrdersRequest,
  GetOpenOrdersResponse
>;

export function getOpenOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOpenOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOpenOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getOpenOrdersEndpointSchema, payload),
    config
  );
}
