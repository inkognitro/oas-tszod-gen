import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getSubOrdersEndpointSchema = {
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

export type GetSubOrdersRequest = RequestUnion<
  any,
  any,
  {
    algoId: number; // int
    page?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSubOrdersResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSubOrdersRequestResult = RequestResult<
  GetSubOrdersRequest,
  GetSubOrdersResponse
>;

export function getSubOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSubOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getSubOrdersEndpointSchema, payload),
    config
  );
}
