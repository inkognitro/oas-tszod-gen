import {
  canceledMarginOrderDetailZodSchema,
  marginOcoOrderZodSchema,
  errorZodSchema,
  CanceledMarginOrderDetail,
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
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteSapiV1MarginOpenordersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum('TRUE', 'FALSE').optional(),
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
              z.union([
                canceledMarginOrderDetailZodSchema.partial(),
                marginOcoOrderZodSchema.partial(),
              ]),
              z.union([
                canceledMarginOrderDetailZodSchema,
                marginOcoOrderZodSchema,
              ])
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

export type DeleteSapiV1MarginOpenordersPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginOpenordersResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          ((Partial<CanceledMarginOrderDetail> | Partial<MarginOcoOrder>) &
            (CanceledMarginOrderDetail | MarginOcoOrder))[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type DeleteSapiV1MarginOpenordersRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginOpenordersResponse
>;

export function deleteSapiV1MarginOpenorders(
  requestHandler: RequestHandler,
  payload: DeleteSapiV1MarginOpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginOpenordersEndpointSchema,
    }),
    config
  );
}
