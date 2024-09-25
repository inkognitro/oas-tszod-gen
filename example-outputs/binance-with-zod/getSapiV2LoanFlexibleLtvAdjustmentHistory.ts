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

export const getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/ltv/adjustment/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    collateralCoin: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
                loanCoin: z.string(),
                collateralCoin: z.string(),
                direction: z.string(),
                collateralAmount: z.string(),
                preLTV: z.string(),
                afterLTV: z.string(),
                adjustTime: z.number().int().safe().finite(),
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

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              loanCoin: string;
              collateralCoin: string;
              direction: string;
              collateralAmount: string;
              preLTV: string;
              afterLTV: string;
              adjustTime: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult =
  RequestResult<Request, GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse>;

export function getSapiV2LoanFlexibleLtvAdjustmentHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleLtvAdjustmentHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema,
    }),
    config
  );
}
