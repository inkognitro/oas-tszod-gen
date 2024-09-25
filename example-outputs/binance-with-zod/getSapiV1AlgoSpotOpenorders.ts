import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1AlgoSpotOpenordersEndpointSchema = {
  path: '/sapi/v1/algo/spot/openOrders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1AlgoSpotOpenordersPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AlgoSpotOpenordersResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1AlgoSpotOpenordersRequestResult = RequestResult<
  Request,
  GetSapiV1AlgoSpotOpenordersResponse
>;

export function getSapiV1AlgoSpotOpenorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AlgoSpotOpenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AlgoSpotOpenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AlgoSpotOpenordersEndpointSchema,
    }),
    config
  );
}
