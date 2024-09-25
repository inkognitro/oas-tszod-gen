import {
  marginOrderZodSchema,
  errorZodSchema,
  MarginOrder,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteSapiV1MarginOrderEndpointSchema = {
  path: '/sapi/v1/margin/order',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum('TRUE', 'FALSE').optional(),
    orderId: z.number().int().safe().finite().optional(),
    origClientOrderId: z.string().optional(),
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
          zodSchema: marginOrderZodSchema,
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

export type DeleteSapiV1MarginOrderPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    origClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginOrderResponse =
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', MarginOrder>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteSapiV1MarginOrderRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginOrderResponse
>;

export function deleteSapiV1MarginOrder(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1MarginOrderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginOrderEndpointSchema,
    }),
    config
  );
}
