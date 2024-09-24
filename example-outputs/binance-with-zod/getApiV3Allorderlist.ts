import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3AllorderlistEndpointSchema = {
  path: '/api/v3/allOrderList',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromId: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
            })
          ),
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

export type GetApiV3AllorderlistPayload = {
  queryParams: {
    fromId?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AllorderlistResponse =
  | Response<
      200,
      ResponseData<
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
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AllorderlistRequestResult = RequestResult<
  Request,
  GetApiV3AllorderlistResponse
>;

export function getApiV3Allorderlist(
  requestHandler: RequestHandler,
  payload: GetApiV3AllorderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AllorderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3AllorderlistEndpointSchema,
    }),
    config
  );
}
