import {
  marginOrderDetailZodSchema,
  errorZodSchema,
  MarginOrderDetail,
  Error,
} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginAllordersEndpointSchema = {
  path: '/sapi/v1/margin/allOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    orderId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
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

export type GetSapiV1MarginAllordersPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginAllordersResponse =
  | Response<200, ResponseBodyData<'application/json', MarginOrderDetail[]>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllordersRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAllordersResponse
>;

export function getSapiV1MarginAllorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginAllordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAllordersEndpointSchema,
    }),
    config
  );
}
