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

export const getSapiV1AlgoFuturesOpenordersEndpointSchema = {
  path: '/sapi/v1/algo/futures/openOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
            orders: z
              .array(
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
              )
              .optional(),
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

export type GetSapiV1AlgoFuturesOpenordersRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AlgoFuturesOpenordersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          orders?: {
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoFuturesOpenordersRequestResult = RequestResult<
  GetSapiV1AlgoFuturesOpenordersRequest,
  GetSapiV1AlgoFuturesOpenordersResponse
>;

export function getSapiV1AlgoFuturesOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AlgoFuturesOpenordersRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoFuturesOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AlgoFuturesOpenordersEndpointSchema, payload),
    config
  );
}
