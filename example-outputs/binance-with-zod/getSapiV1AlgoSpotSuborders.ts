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

export const getSapiV1AlgoSpotSubordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/subOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    algoId: z.number().int().safe().finite(),
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
            executedQty: z.string(),
            executedAmt: z.string(),
            subOrders: z.array(
              z.object({
                algoId: z.number().int().safe().finite(),
                orderId: z.number().int().safe().finite(),
                orderStatus: z.string(),
                executedQty: z.string(),
                executedAmt: z.string(),
                feeAmt: z.string(),
                feeAsset: z.string(),
                bookTime: z.number().int().safe().finite(),
                avgPrice: z.string(),
                side: z.string(),
                symbol: z.string(),
                subId: z.number().int().safe().finite(),
                timeInForce: z.string(),
                origQty: z.string(),
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

export type GetSapiV1AlgoSpotSubordersPayload = {
  queryParams: {
    algoId: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoSpotSubordersResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          executedQty: string;
          executedAmt: string;
          subOrders: {
            algoId: number; // int
            orderId: number; // int
            orderStatus: string;
            executedQty: string;
            executedAmt: string;
            feeAmt: string;
            feeAsset: string;
            bookTime: number; // int
            avgPrice: string;
            side: string;
            symbol: string;
            subId: number; // int
            timeInForce: string;
            origQty: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AlgoSpotSubordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoSpotSubordersResponse
>;

export function getSapiV1AlgoSpotSuborders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoSpotSubordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotSubordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoSpotSubordersEndpointSchema,
    }),
    config
  );
}
