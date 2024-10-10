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

export const getOpenOrderListEndpointSchema = {
  path: '/api/v3/openOrderList',
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
          zodSchema: z.array(
            z.object({
              orderListId: z.number().int().safe().finite(),
              contingencyType: z.string(),
              listStatusType: z.string(),
              listOrderStatus: z.string(),
              listClientOrderId: z.string(),
              transactionTime: z.number().int().safe().finite(),
              symbol: z.string(),
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

export type GetOpenOrderListRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOpenOrderListResponse =
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
          orders: {
            symbol: string;
            orderId: number; // int
            clientOrderId: string;
          }[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOpenOrderListRequestResult = RequestResult<
  GetOpenOrderListRequest,
  GetOpenOrderListResponse
>;

export function getOpenOrderList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOpenOrderListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOpenOrderListRequestResult> {
  return requestHandler.execute(
    createRequest(getOpenOrderListEndpointSchema, payload),
    config
  );
}
