import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LoanBorrowEndpointSchema = {
  path: '/sapi/v1/loan/borrow',
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

export type PostSapiV1LoanBorrowPayload = {
  queryParams: {
    loanCoin: string;
    loanAmount?: number;
    collateralCoin: string;
    collateralAmount?: number;
    loanTerm: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  PostSapiV1LoanBorrowResponse
>;

export function postSapiV1LoanBorrow(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanBorrowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanBorrowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanBorrowEndpointSchema,
    }),
    config
  );
}
