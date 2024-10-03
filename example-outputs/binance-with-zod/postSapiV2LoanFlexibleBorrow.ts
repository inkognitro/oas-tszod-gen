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

export const postSapiV2LoanFlexibleBorrowEndpointSchema = {
  path: '/sapi/v2/loan/flexible/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    loanCoin: z.string().optional(),
    loanAmount: z.number().safe().finite().optional(),
    collateralCoin: z.string().optional(),
    collateralAmount: z.number().safe().finite().optional(),
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
            collateralCoin: z.string().optional(),
            collateralAmount: z.string(),
            status: z.string(),
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

export type PostSapiV2LoanFlexibleBorrowRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    loanAmount?: number;
    collateralCoin?: string;
    collateralAmount?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV2LoanFlexibleBorrowResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          loanAmount: string;
          collateralCoin?: string;
          collateralAmount: string;
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2LoanFlexibleBorrowRequestResult = RequestResult<
  PostSapiV2LoanFlexibleBorrowRequest,
  PostSapiV2LoanFlexibleBorrowResponse
>;

export function postSapiV2LoanFlexibleBorrow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV2LoanFlexibleBorrowRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2LoanFlexibleBorrowRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV2LoanFlexibleBorrowEndpointSchema, payload),
    config
  );
}
