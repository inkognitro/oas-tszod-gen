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

export const getSapiV1LoanRepayCollateralRateEndpointSchema = {
  path: '/sapi/v1/loan/repay/collateral/rate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string(),
    collateralCoin: z.string(),
    repayAmount: z.number().safe().finite(),
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
            loanCoin: z.string(),
            collateralCoin: z.string(),
            repayAmount: z.string(),
            rate: z.string(),
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

export type GetSapiV1LoanRepayCollateralRatePayload = {
  queryParams: {
    loanCoin: string;
    collateralCoin: string;
    repayAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanRepayCollateralRateResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            loanCoin: string;
            collateralCoin: string;
            repayAmount: string;
            rate: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanRepayCollateralRateRequestResult = RequestResult<
  Request,
  GetSapiV1LoanRepayCollateralRateResponse
>;

export function getSapiV1LoanRepayCollateralRate(
  requestHandler: RequestHandler,
  payload: GetSapiV1LoanRepayCollateralRatePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanRepayCollateralRateRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanRepayCollateralRateEndpointSchema,
    }),
    config
  );
}
