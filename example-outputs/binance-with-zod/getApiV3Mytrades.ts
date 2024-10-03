import {
  myTradeZodSchema,
  errorZodSchema,
  MyTrade,
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

export const getApiV3MytradesEndpointSchema = {
  path: '/api/v3/myTrades',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    orderId: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(myTradeZodSchema),
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

export type GetApiV3MytradesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    fromId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3MytradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MyTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3MytradesRequestResult = RequestResult<
  GetApiV3MytradesRequest,
  GetApiV3MytradesResponse
>;

export function getApiV3Mytrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3MytradesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MytradesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3MytradesEndpointSchema, payload),
    config
  );
}
