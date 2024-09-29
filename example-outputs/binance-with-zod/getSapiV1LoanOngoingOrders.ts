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

export const getSapiV1LoanOngoingOrdersEndpointSchema = {
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

export type GetSapiV1LoanOngoingOrdersPayload = {
  queryParams: {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanOngoingOrdersResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV1LoanOngoingOrdersResponse
>;

export function getSapiV1LoanOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanOngoingOrdersEndpointSchema,
    }),
    config
  );
}
