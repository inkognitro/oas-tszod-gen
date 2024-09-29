import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LoanVipBorrowEndpointSchema = {
  path: '/sapi/v1/loan/vip/borrow',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
