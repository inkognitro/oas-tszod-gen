import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1AlgoSpotHistoricalordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/historicalOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    side: z.enum(['SELL', 'BUY']),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    page: z.number().int().safe().finite().optional(),
    pageSize: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            total: z.number().int().safe().finite(),
            orders: z.array(
              z.object({
                algoId: z.number().int().safe().finite(),
                symbol: z.string(),
                side: z.string(),
                totalQty: z.string(),
                executedQty: z.string(),
                executedAmt: z.string(),
                avgPrice: z.string(),
                clientAlgoId: z.string(),
                bookTime: z.number().int().safe().finite(),
                endTime: z.number().int().safe().finite(),
                algoStatus: z.string(),
                algoType: z.string(),
                urgency: z.string(),
              })
            ),
          }),
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

export type GetSapiV1AlgoSpotHistoricalordersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    side: 'SELL' | 'BUY';
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AlgoSpotHistoricalordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          orders: {
            algoId: number; // int
            symbol: string;
            side: string;
            totalQty: string;
            executedQty: string;
            executedAmt: string;
            avgPrice: string;
            clientAlgoId: string;
            bookTime: number; // int
            endTime: number; // int
            algoStatus: string;
            algoType: string;
            urgency: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoSpotHistoricalordersRequestResult = RequestResult<
  GetSapiV1AlgoSpotHistoricalordersRequest,
  GetSapiV1AlgoSpotHistoricalordersResponse
>;

export function getSapiV1AlgoSpotHistoricalorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1AlgoSpotHistoricalordersRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotHistoricalordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AlgoSpotHistoricalordersEndpointSchema, payload),
    config
  );
}
