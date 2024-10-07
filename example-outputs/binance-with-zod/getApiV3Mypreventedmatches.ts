import {z_Error, Error} from '@example-outputs/binance-with-zod';
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

export const getApiV3MypreventedmatchesEndpointSchema = {
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

export type GetApiV3MypreventedmatchesRequest = RequestUnion<
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

export type GetApiV3MypreventedmatchesResponse =
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

export type GetApiV3MypreventedmatchesRequestResult = RequestResult<
  GetApiV3MypreventedmatchesRequest,
  GetApiV3MypreventedmatchesResponse
>;

export function getApiV3Mypreventedmatches(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3MypreventedmatchesRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3MypreventedmatchesRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3MypreventedmatchesEndpointSchema, payload),
    config
  );
}
