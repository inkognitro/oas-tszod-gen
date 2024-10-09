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

export const postRenewEndpointSchema = {
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

export type PostRenewRequest = RequestUnion<
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

export type PostRenewResponse =
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

export type PostRenewRequestResult = RequestResult<
  PostRenewRequest,
  PostRenewResponse
>;

export function postRenew(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRenewRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRenewRequestResult> {
  return requestHandler.execute(
    createRequest(postRenewEndpointSchema, payload),
    config
  );
}
