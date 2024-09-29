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

export const postSapiV2LoanFlexibleBorrowEndpointSchema = {
  path: '/sapi/v2/loan/flexible/borrow',
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

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
