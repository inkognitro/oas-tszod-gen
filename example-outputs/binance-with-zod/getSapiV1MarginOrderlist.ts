import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginOrderlistEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
    symbol: z.string().optional(),
    orderListId: z.number().int().safe().finite().optional(),
    origClientOrderId: z.string().optional(),
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
            orderListId: z.number().int().safe().finite(),
            contingencyType: z.string(),
            listStatusType: z.string(),
            listOrderStatus: z.string(),
            listClientOrderId: z.string(),
            transactionTime: z.number().int().safe().finite(),
            symbol: z.string(),
            isIsolated: z.boolean(),
            orders: z.array(
              z.object({
                symbol: z.string(),
                orderId: z.number().int().safe().finite(),
                clientOrderId: z.string(),
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

export type GetSapiV1MarginOrderlistPayload = {
  queryParams: {
    isIsolated?: 'TRUE' | 'FALSE';
    symbol?: string;
    orderListId?: number; // int
    origClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginOrderlistResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderListId: number; // int
          contingencyType: string;
          listStatusType: string;
          listOrderStatus: string;
          listClientOrderId: string;
          transactionTime: number; // int
          symbol: string;
          isIsolated: boolean;
          orders: {
            symbol: string;
            orderId: number; // int
            clientOrderId: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginOrderlistRequestResult = RequestResult<
  Request,
  GetSapiV1MarginOrderlistResponse
>;

export function getSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginOrderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginOrderlistEndpointSchema,
    }),
    config
  );
}
