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

export const postSapiV1ManagedSubaccountDepositEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/deposit',
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

export type PostSapiV1ManagedSubaccountDepositRequest = RequestUnion<
  any,
  any,
  {
    toEmail: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1ManagedSubaccountDepositResponse =
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

export type PostSapiV1ManagedSubaccountDepositRequestResult = RequestResult<
  PostSapiV1ManagedSubaccountDepositRequest,
  PostSapiV1ManagedSubaccountDepositResponse
>;

export function postSapiV1ManagedSubaccountDeposit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1ManagedSubaccountDepositRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ManagedSubaccountDepositRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1ManagedSubaccountDepositEndpointSchema, payload),
    config
  );
}
