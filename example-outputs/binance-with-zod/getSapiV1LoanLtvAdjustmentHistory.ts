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

export const getSapiV1LoanLtvAdjustmentHistoryEndpointSchema = {
  path: '/sapi/v1/loan/ltv/adjustment/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    orderId: z.number().int().safe().finite().optional(),
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
                amount: z.string(),
                preLTV: z.string(),
                afterLTV: z.string(),
                adjustTime: z.number().int().safe().finite(),
                orderId: z.number().int().safe().finite(),
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

export type GetSapiV1LoanLtvAdjustmentHistoryPayload = {
  queryParams: {
    orderId?: number; // int
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

export type GetSapiV1LoanLtvAdjustmentHistoryResponse =
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
              amount: string;
              preLTV: string;
              afterLTV: string;
              adjustTime: number; // int
              orderId: number; // int
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1LoanLtvAdjustmentHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1LoanLtvAdjustmentHistoryResponse
>;

export function getSapiV1LoanLtvAdjustmentHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanLtvAdjustmentHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanLtvAdjustmentHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanLtvAdjustmentHistoryEndpointSchema,
    }),
    config
  );
}
