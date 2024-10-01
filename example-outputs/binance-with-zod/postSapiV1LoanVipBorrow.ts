import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LoanVipBorrowEndpointSchema = {
  path: '/sapi/v1/loan/vip/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanAccountId: z.number().int().safe().finite(),
    loanCoin: z.string().optional(),
    loanAmount: z.number().safe().finite(),
    collateralAccountId: z.string(),
    collateralCoin: z.string(),
    isFlexibleRate: z.enum(['TRUE', 'FALSE']),
    loanTerm: z.number().int().safe().finite().optional(),
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
            loanAccountId: z.string(),
            requestId: z.string(),
            loanCoin: z.string(),
            isFlexibleRate: z.string(),
            loanAmount: z.string(),
            collateralAccountId: z.string(),
            collateralCoin: z.string(),
            loanTerm: z.string().optional(),
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

export type PostSapiV1LoanVipBorrowPayload = {
  queryParams: {
    loanAccountId: number; // int
    loanCoin?: string;
    loanAmount: number;
    collateralAccountId: string;
    collateralCoin: string;
    isFlexibleRate: 'TRUE' | 'FALSE';
    loanTerm?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanVipBorrowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanAccountId: string;
          requestId: string;
          loanCoin: string;
          isFlexibleRate: string;
          loanAmount: string;
          collateralAccountId: string;
          collateralCoin: string;
          loanTerm?: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanVipBorrowRequestResult = RequestResult<
  Request,
  PostSapiV1LoanVipBorrowResponse
>;

export function postSapiV1LoanVipBorrow(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanVipBorrowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipBorrowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanVipBorrowEndpointSchema,
    }),
    config
  );
}
