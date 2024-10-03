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

export const postSapiV1MarginBorrowRepayEndpointSchema = {
  path: '/sapi/v1/margin/borrow-repay',
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
  },
};

export type PostSapiV1MarginBorrowRepayRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    isIsolated: string;
    symbol: string;
    amount: number;
    type: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1MarginBorrowRepayResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MarginBorrowRepayRequestResult = RequestResult<
  PostSapiV1MarginBorrowRepayRequest,
  PostSapiV1MarginBorrowRepayResponse
>;

export function postSapiV1MarginBorrowRepay(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSapiV1MarginBorrowRepayRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginBorrowRepayRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1MarginBorrowRepayEndpointSchema, payload),
    config
  );
}
