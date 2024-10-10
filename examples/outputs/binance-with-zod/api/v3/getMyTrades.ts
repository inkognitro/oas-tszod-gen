import {z_MyTrade, z_Error, MyTrade, Error} from '../../';
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
} from '../../core';

export const getMyTradesEndpointSchema = {
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
          zodSchema: z.array(z_MyTrade),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetMyTradesRequest = RequestUnion<
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

export type GetMyTradesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MyTrade[]>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetMyTradesRequestResult = RequestResult<
  GetMyTradesRequest,
  GetMyTradesResponse
>;

export function getMyTrades(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMyTradesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMyTradesRequestResult> {
  return requestHandler.execute(
    createRequest(getMyTradesEndpointSchema, payload),
    config
  );
}
