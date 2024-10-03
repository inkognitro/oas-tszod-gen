import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV2LoanFlexibleBorrowHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/borrow/history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                loanCoin: z.string(),
                initialLoanAmount: z.string(),
                collateralCoin: z.string(),
                initialCollateralAmount: z.string(),
                borrowTime: z.number().int().safe().finite(),
                status: z.string(),
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

export type GetSapiV2LoanFlexibleBorrowHistoryRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    collateralCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2LoanFlexibleBorrowHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanCoin: string;
            initialLoanAmount: string;
            collateralCoin: string;
            initialCollateralAmount: string;
            borrowTime: number; // int
            status: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleBorrowHistoryRequestResult = RequestResult<
  GetSapiV2LoanFlexibleBorrowHistoryRequest,
  GetSapiV2LoanFlexibleBorrowHistoryResponse
>;

export function getSapiV2LoanFlexibleBorrowHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleBorrowHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleBorrowHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleBorrowHistoryEndpointSchema, payload),
    config
  );
}
