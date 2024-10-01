import {
  orderZodSchema,
  ocoOrderZodSchema,
  errorZodSchema,
  Order,
  OcoOrder,
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
              z.union([orderZodSchema.partial(), ocoOrderZodSchema.partial()]),
              z.union([orderZodSchema, ocoOrderZodSchema])
            )
          ),
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

export type DeleteApiV3OpenordersPayload = {
  queryParams: {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  DeleteApiV3OpenordersResponse
>;

export function deleteApiV3Openorders(
  requestHandler: SimpleRequestHandler,
  payload: DeleteApiV3OpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteApiV3OpenordersEndpointSchema,
    }),
    config
  );
}
