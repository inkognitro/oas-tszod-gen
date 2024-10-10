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

export const getOpenOrdersEndpointSchema = {
  path: '/api/v3/openOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
          zodSchema: z.array(z_OrderDetails),
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
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOpenOrdersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails[]>>
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
