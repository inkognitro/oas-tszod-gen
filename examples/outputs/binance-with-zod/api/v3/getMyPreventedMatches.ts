import {z_Error, Error} from '../../';
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

export const getMyPreventedMatchesEndpointSchema = {
  path: '/api/v3/myPreventedMatches',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    preventedMatchId: z.number().int().safe().finite().optional(),
    orderId: z.number().int().safe().finite().optional(),
    fromPreventedMatchId: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(
            z.object({
              symbol: z.string(),
              preventedMatchId: z.number().int().safe().finite(),
              takerOrderId: z.number().int().safe().finite(),
              makerOrderId: z.number().int().safe().finite(),
              tradeGroupId: z.number().int().safe().finite(),
              selfTradePreventionMode: z.string(),
              price: z.string(),
              makerPreventedQuantity: z.string(),
              transactTime: z.number().int().safe().finite(),
            })
          ),
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

export type GetMyPreventedMatchesRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    preventedMatchId?: number; // int
    orderId?: number; // int
    fromPreventedMatchId?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetMyPreventedMatchesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol: string;
          preventedMatchId: number; // int
          takerOrderId: number; // int
          makerOrderId: number; // int
          tradeGroupId: number; // int
          selfTradePreventionMode: string;
          price: string;
          makerPreventedQuantity: string;
          transactTime: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetMyPreventedMatchesRequestResult = RequestResult<
  GetMyPreventedMatchesRequest,
  GetMyPreventedMatchesResponse
>;

export function getMyPreventedMatches(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMyPreventedMatchesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMyPreventedMatchesRequestResult> {
  return requestHandler.execute(
    createRequest(getMyPreventedMatchesEndpointSchema, payload),
    config
  );
}
