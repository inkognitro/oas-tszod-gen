import {
  marginTradeZodSchema,
  errorZodSchema,
  MarginTrade,
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

export const getSapiV1MarginMytradesEndpointSchema = {
  path: '/sapi/v1/margin/myTrades',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    fromId: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(marginTradeZodSchema),
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

export type GetSapiV1MarginMytradesPayload = {
  queryParams: {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginMytradesResponse =
  | Response<200, ResponseBodyData<'application/json', MarginTrade[]>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginMytradesRequestResult = RequestResult<
  Request,
  GetSapiV1MarginMytradesResponse
>;

export function getSapiV1MarginMytrades(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginMytradesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMytradesRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginMytradesEndpointSchema,
    }),
    config
  );
}
