import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const postBorrowEndpointSchema = {
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

export type PostBorrowRequest = RequestUnion<
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

export type PostBorrowResponse =
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

export type PostBorrowRequestResult = RequestResult<
  PostBorrowRequest,
  PostBorrowResponse
>;

export function postBorrow(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBorrowRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBorrowRequestResult> {
  return requestHandler.execute(
    createRequest(postBorrowEndpointSchema, payload),
    config
  );
}
