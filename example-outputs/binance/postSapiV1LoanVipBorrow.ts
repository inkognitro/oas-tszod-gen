import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

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

export type PostSapiV1LoanVipBorrowRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

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
  PostSapiV1LoanVipBorrowRequest,
  PostSapiV1LoanVipBorrowResponse
>;

export function postSapiV1LoanVipBorrow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanVipBorrowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipBorrowRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanVipBorrowEndpointSchema, payload),
    config
  );
}
