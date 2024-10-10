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

export const getOrdersEndpointSchema = {
  path: '/sapi/v1/loan/ongoing/orders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
    loanCoin: z.string().optional(),
    collateralCoin: z.string().optional(),
    current: z.number().int().safe().finite().optional(),
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
          zodSchema: z.object({
            rows: z.array(
              z.object({
                orderId: z.number().int().safe().finite(),
                loanCoin: z.string(),
                totalDebt: z.string(),
                residualInterest: z.string(),
                collateralCoin: z.string(),
                collateralAmount: z.string(),
                currentLTV: z.string(),
                expirationTime: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
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

export type GetOrdersRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            orderId: number; // int
            loanCoin: string;
            totalDebt: string;
            residualInterest: string;
            collateralCoin: string;
            collateralAmount: string;
            currentLTV: string;
            expirationTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOrdersRequestResult = RequestResult<
  GetOrdersRequest,
  GetOrdersResponse
>;

export function getOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getOrdersEndpointSchema, payload),
    config
  );
}
