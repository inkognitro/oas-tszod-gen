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

export const postSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
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
  },
};

export type PostSapiV1MarginBorrowRepayPayload = {
  queryParams: {
    asset: string;
    isIsolated: string;
    symbol: string;
    amount: number;
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginBorrowRepayResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginBorrowRepayRequestResult = RequestResult<
  Request,
  PostSapiV1MarginBorrowRepayResponse
>;

export function postSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginBorrowRepayPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginBorrowRepayEndpointSchema,
    }),
    config
  );
}
