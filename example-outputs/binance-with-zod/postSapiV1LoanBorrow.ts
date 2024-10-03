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

export const postSapiV1LoanBorrowEndpointSchema = {
  path: '/sapi/v1/loan/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string(),
    loanAmount: z.number().safe().finite().optional(),
    collateralCoin: z.string(),
    collateralAmount: z.number().safe().finite().optional(),
    loanTerm: z.number().int().safe().finite(),
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
            loanAmount: z.string(),
            collateralCoin: z.string(),
            collateralAmount: z.string(),
            hourlyInterestRate: z.string(),
            orderId: z.string(),
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

export type PostSapiV1LoanBorrowRequest = RequestUnion<
  any,
  any,
  {
    loanCoin: string;
    loanAmount?: number;
    collateralCoin: string;
    collateralAmount?: number;
    loanTerm: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanBorrowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          loanAmount: string;
          collateralCoin: string;
          collateralAmount: string;
          hourlyInterestRate: string;
          orderId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanBorrowRequestResult = RequestResult<
  PostSapiV1LoanBorrowRequest,
  PostSapiV1LoanBorrowResponse
>;

export function postSapiV1LoanBorrow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanBorrowRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanBorrowRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanBorrowEndpointSchema, payload),
    config
  );
}
