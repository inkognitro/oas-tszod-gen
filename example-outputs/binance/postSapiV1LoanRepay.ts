import {RepaymentInfo, RepaymentInfo2, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1LoanRepayEndpointSchema = {
  path: '/sapi/v1/loan/repay',
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

export type PostSapiV1LoanRepayPayload = {
  queryParams: {
    orderId: number; // int
    amount: number;
    type?: number; // int
    collateralReturn?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1LoanRepayResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1LoanRepayRequestResult = RequestResult<
  Request,
  PostSapiV1LoanRepayResponse
>;

export function postSapiV1LoanRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1LoanRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1LoanRepayEndpointSchema,
    }),
    config
  );
}
