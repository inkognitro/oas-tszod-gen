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

export const postSapiV1ManagedSubaccountWithdrawEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/withdraw',
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

export type PostSapiV1ManagedSubaccountWithdrawRequest = RequestUnion<
  any,
  any,
  {
    fromEmail: string;
    asset: string;
    amount: number;
    transferDate?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ManagedSubaccountWithdrawResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ManagedSubaccountWithdrawRequestResult = RequestResult<
  PostSapiV1ManagedSubaccountWithdrawRequest,
  PostSapiV1ManagedSubaccountWithdrawResponse
>;

export function postSapiV1ManagedSubaccountWithdraw(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1ManagedSubaccountWithdrawRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ManagedSubaccountWithdrawRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ManagedSubaccountWithdrawEndpointSchema, payload),
    config
  );
}
