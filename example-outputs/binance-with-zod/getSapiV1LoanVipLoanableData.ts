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

export const getSapiV1LoanVipLoanableDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/loanable/data',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    vipLevel: z.number().int().safe().finite().optional(),
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
                _flexibleDailyInterestRate: z.string(),
                _flexibleYearlyInterestRate: z.string(),
                _30dDailyInterestRate: z.string(),
                _30dYearlyInterestRate: z.string(),
                _60dDailyInterestRate: z.string(),
                _60dYearlyInterestRate: z.string(),
                minLimit: z.string(),
                maxLimit: z.string(),
                vipLevel: z.number().int().safe().finite(),
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

export type GetSapiV1LoanVipLoanableDataPayload = {
  queryParams: {
    loanCoin?: string;
    vipLevel?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanVipLoanableDataResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            rows: {
              loanCoin: string;
              _flexibleDailyInterestRate: string;
              _flexibleYearlyInterestRate: string;
              _30dDailyInterestRate: string;
              _30dYearlyInterestRate: string;
              _60dDailyInterestRate: string;
              _60dYearlyInterestRate: string;
              minLimit: string;
              maxLimit: string;
              vipLevel: number; // int
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanVipLoanableDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanVipLoanableDataResponse
>;

export function getSapiV1LoanVipLoanableData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanVipLoanableDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipLoanableDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanVipLoanableDataEndpointSchema,
    }),
    config
  );
}
