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

export const postSapiV1LoanVipRenewEndpointSchema = {
  path: '/sapi/v1/loan/vip/renew',
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

export type PostSapiV1LoanVipRenewRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    loanTerm?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanVipRenewResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          loanAccountId: string;
          loanCoin: string;
          loanAmount: string;
          collateralAccountId: string;
          collateralCoin: string;
          loanTerm: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanVipRenewRequestResult = RequestResult<
  PostSapiV1LoanVipRenewRequest,
  PostSapiV1LoanVipRenewResponse
>;

export function postSapiV1LoanVipRenew(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanVipRenewRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRenewRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanVipRenewEndpointSchema, payload),
    config
  );
}
