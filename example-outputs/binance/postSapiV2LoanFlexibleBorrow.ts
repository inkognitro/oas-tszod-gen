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
