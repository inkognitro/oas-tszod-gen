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

export const getSapiV2LoanFlexibleOngoingOrdersEndpointSchema = {
  path: '/sapi/v2/loan/flexible/ongoing/orders',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                loanCoin: z.string(),
                totalDebt: z.string(),
                collateralCoin: z.string(),
                collateralAmount: z.string(),
                currentLTV: z.string(),
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

export type GetSapiV2LoanFlexibleOngoingOrdersPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleOngoingOrdersResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            rows: {
              loanCoin: string;
              totalDebt: string;
              collateralCoin: string;
              collateralAmount: string;
              currentLTV: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2LoanFlexibleOngoingOrdersRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleOngoingOrdersResponse
>;

export function getSapiV2LoanFlexibleOngoingOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleOngoingOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleOngoingOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleOngoingOrdersEndpointSchema,
    }),
    config
  );
}
