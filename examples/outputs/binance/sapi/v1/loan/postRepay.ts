import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {RepaymentInfo, RepaymentInfo2, Error} from '../../../';

export const postRepayEndpointSchema = {
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

export type PostRepayRequest = RequestUnion<
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

export type PostRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', RepaymentInfo | RepaymentInfo2>
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRepayRequestResult = RequestResult<
  PostRepayRequest,
  PostRepayResponse
>;

export function postRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRepayRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postRepayEndpointSchema, payload),
    config
  );
}
