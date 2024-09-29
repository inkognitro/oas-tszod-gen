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

export const postSapiV1LoanVipRepayEndpointSchema = {
  path: '/sapi/v1/loan/vip/repay',
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

export type PostSapiV1LoanVipRepayPayload = {
  queryParams: {
    orderId?: number; // int
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanVipRepayResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanCoin: string;
          repayAmount: string;
          remainingPrincipal: string;
          remainingInterest: string;
          collateralCoin: string;
          currentLTV: string;
          repayStatus: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanVipRepayRequestResult = RequestResult<
  Request,
  PostSapiV1LoanVipRepayResponse
>;

export function postSapiV1LoanVipRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanVipRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanVipRepayEndpointSchema,
    }),
    config
  );
}
