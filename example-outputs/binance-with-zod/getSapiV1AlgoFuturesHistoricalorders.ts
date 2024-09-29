import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1AlgoFuturesHistoricalordersEndpointSchema = {
  path: '/sapi/v1/algo/futures/historicalOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string().optional(),
    side: z.enum(['SELL', 'BUY']).optional(),
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
                positionSide: z.string(),
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

export type GetSapiV1AlgoFuturesHistoricalordersPayload = {
  queryParams: {
    symbol?: string;
    side?: 'SELL' | 'BUY';
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoFuturesHistoricalordersResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          orders: {
            algoId: number; // int
            symbol: string;
            side: string;
            positionSide: string;
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoFuturesHistoricalordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoFuturesHistoricalordersResponse
>;

export function getSapiV1AlgoFuturesHistoricalorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoFuturesHistoricalordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoFuturesHistoricalordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoFuturesHistoricalordersEndpointSchema,
    }),
    config
  );
}
