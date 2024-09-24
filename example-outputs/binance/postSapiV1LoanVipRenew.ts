import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LoanVipRenewEndpointSchema = {
  path: '/sapi/v1/loan/vip/renew',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1LoanVipRenewPayload = {
  queryParams: {
    orderId?: number; // int
    loanTerm?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanVipRenewResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LoanVipRenewRequestResult = RequestResult<
  Request,
  PostSapiV1LoanVipRenewResponse
>;

export function postSapiV1LoanVipRenew(
  requestHandler: RequestHandler,
  payload: PostSapiV1LoanVipRenewPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanVipRenewRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanVipRenewEndpointSchema,
    }),
    config
  );
}
