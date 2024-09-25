import {
  marginOcoOrderZodSchema,
  errorZodSchema,
  MarginOcoOrder,
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

export const deleteSapiV1MarginOrderlistEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum('TRUE', 'FALSE').optional(),
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
          zodSchema: marginOcoOrderZodSchema,
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

export type DeleteSapiV1MarginOrderlistPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginOrderlistResponse =
  | Response<
      200,
      ResponseData<ResponseBodyData<'application/json', MarginOcoOrder>>
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteSapiV1MarginOrderlistRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginOrderlistResponse
>;

export function deleteSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1MarginOrderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginOrderlistEndpointSchema,
    }),
    config
  );
}
