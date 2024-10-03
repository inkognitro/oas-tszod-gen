import {
  marginOcoOrderZodSchema,
  errorZodSchema,
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

export const deleteSapiV1MarginOrderlistEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
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

export type DeleteSapiV1MarginOrderlistRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1MarginOrderlistResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOcoOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOrderlistRequestResult = RequestResult<
  DeleteSapiV1MarginOrderlistRequest,
  DeleteSapiV1MarginOrderlistResponse
>;

export function deleteSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteSapiV1MarginOrderlistRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1MarginOrderlistEndpointSchema, payload),
    config
  );
}
