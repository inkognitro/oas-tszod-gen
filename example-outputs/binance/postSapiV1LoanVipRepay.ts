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

export type PostSapiV1LoanVipRepayRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanVipRepayResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanVipRepayRequestResult = RequestResult<
  PostSapiV1LoanVipRepayRequest,
  PostSapiV1LoanVipRepayResponse
>;

export function postSapiV1LoanVipRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanVipRepayRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanVipRepayEndpointSchema, payload),
    config
  );
}
