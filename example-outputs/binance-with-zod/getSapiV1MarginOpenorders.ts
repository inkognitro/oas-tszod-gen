import {
  marginOrderDetailZodSchema,
  errorZodSchema,
  MarginOrderDetail,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginOpenordersEndpointSchema = {
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
          zodSchema: z.array(marginOrderDetailZodSchema),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginOpenordersPayload = {
  queryParams: {
    symbol?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', MarginOrderDetail[]>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOpenordersRequestResult = RequestResult<
  Request,
  GetSapiV1MarginOpenordersResponse
>;

export function getSapiV1MarginOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginOpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginOpenordersEndpointSchema,
    }),
    config
  );
}
