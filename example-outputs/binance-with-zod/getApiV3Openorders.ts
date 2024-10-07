import {
  z_OrderDetails,
  z_Error,
  OrderDetails,
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

export const getApiV3OpenordersEndpointSchema = {
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

export type GetApiV3OpenordersRequest = RequestUnion<
  any,
  any,
  {
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3OpenordersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OrderDetails[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3OpenordersRequestResult = RequestResult<
  GetApiV3OpenordersRequest,
  GetApiV3OpenordersResponse
>;

export function getApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3OpenordersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3OpenordersEndpointSchema, payload),
    config
  );
}
