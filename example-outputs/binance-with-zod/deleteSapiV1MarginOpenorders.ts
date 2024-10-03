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
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const deleteSapiV1MarginOpenordersEndpointSchema = {
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

export type DeleteSapiV1MarginOpenordersRequest = RequestUnion<
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

export type DeleteSapiV1MarginOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((Partial<CanceledMarginOrderDetail> | Partial<MarginOcoOrder>) &
          (CanceledMarginOrderDetail | MarginOcoOrder))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOpenordersRequestResult = RequestResult<
  DeleteSapiV1MarginOpenordersRequest,
  DeleteSapiV1MarginOpenordersResponse
>;

export function deleteSapiV1MarginOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteSapiV1MarginOpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1MarginOpenordersEndpointSchema, payload),
    config
  );
}
