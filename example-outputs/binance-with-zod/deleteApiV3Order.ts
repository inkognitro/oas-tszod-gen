import {
  orderZodSchema,
  errorZodSchema,
  Order,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteApiV3OrderEndpointSchema = {
  path: '/api/v3/order',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    orderId: z.number().int().safe().finite().optional(),
    origClientOrderId: z.string().optional(),
    newClientOrderId: z.string().optional(),
    cancelRestrictions: z
      .union([z.literal('ONLY_NEW'), z.literal('ONLY_PARTIALLY_FILLED')])
      .optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: orderZodSchema,
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

export type DeleteApiV3OrderPayload = {
  queryParams: {
    symbol: string;
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    cancelRestrictions?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteApiV3OrderResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', Order>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteApiV3OrderRequestResult = RequestResult<
  Request,
  DeleteApiV3OrderResponse
>;

export function deleteApiV3Order(
  requestHandler: RequestHandler,
  payload: DeleteApiV3OrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OrderRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: deleteApiV3OrderEndpointSchema}),
    config
  );
}
