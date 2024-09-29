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

export const getSapiV1LoanVipOngoingOrdersEndpointSchema = {
  path: '/sapi/v1/loan/vip/ongoing/orders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
    collateralAccountId: z.number().int().safe().finite().optional(),
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
                collateralAccountId: z.string(),
                collateralCoin: z.string(),
                collateralValue: z.string(),
                totalCollateralValueAfterHaircut: z.string().optional(),
                lockedCollateralValue: z.string().optional(),
                currentLTV: z.string(),
                expirationTime: z.number().int().safe().finite(),
                loanDate: z.string(),
                loanRate: z.string(),
                loanTerm: z.string(),
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

export type GetSapiV1LoanVipOngoingOrdersPayload = {
  queryParams: {
    orderId?: number; // int
    collateralAccountId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipOngoingOrdersResponse =
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
            collateralAccountId: string;
            collateralCoin: string;
            collateralValue: string;
            totalCollateralValueAfterHaircut?: string;
            lockedCollateralValue?: string;
            currentLTV: string;
            expirationTime: number; // int
            loanDate: string;
            loanRate: string;
            loanTerm: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipOngoingOrdersResponse
>;

export function getSapiV1LoanVipOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipOngoingOrdersEndpointSchema,
    }),
    config
  );
}
