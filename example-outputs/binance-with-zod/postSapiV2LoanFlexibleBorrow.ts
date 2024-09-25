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

export const postSapiV2LoanFlexibleBorrowEndpointSchema = {
  path: '/sapi/v2/loan/flexible/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV2LoanFlexibleBorrowPayload = {
  queryParams: {
    loanCoin?: string;
    loanAmount?: number;
    collateralCoin?: string;
    collateralAmount?: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2LoanFlexibleBorrowResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV2LoanFlexibleBorrowRequestResult = RequestResult<
  Request,
  PostSapiV2LoanFlexibleBorrowResponse
>;

export function postSapiV2LoanFlexibleBorrow(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2LoanFlexibleBorrowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2LoanFlexibleBorrowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV2LoanFlexibleBorrowEndpointSchema,
    }),
    config
  );
}
