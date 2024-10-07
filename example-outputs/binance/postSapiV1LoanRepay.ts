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
import {RepaymentInfo, RepaymentInfo2, Error} from '@example-outputs/binance';

export const postSapiV1LoanRepayEndpointSchema = {
  path: '/sapi/v1/loan/repay',
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

export type PostSapiV1LoanRepayRequest = RequestUnion<
  any,
  any,
  {
    orderId: number; // int
    amount: number;
    type?: number; // int
    collateralReturn?: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1LoanRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1LoanRepayRequestResult = RequestResult<
  PostSapiV1LoanRepayRequest,
  PostSapiV1LoanRepayResponse
>;

export function postSapiV1LoanRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1LoanRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LoanRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LoanRepayEndpointSchema, payload),
    config
  );
}
