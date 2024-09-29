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

export const postSapiV1ManagedSubaccountDepositEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/deposit',
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

export type PostSapiV1ManagedSubaccountDepositPayload = {
  queryParams: {
    toEmail: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ManagedSubaccountDepositResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ManagedSubaccountDepositRequestResult = RequestResult<
  Request,
  PostSapiV1ManagedSubaccountDepositResponse
>;

export function postSapiV1ManagedSubaccountDeposit(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ManagedSubaccountDepositPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ManagedSubaccountDepositRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ManagedSubaccountDepositEndpointSchema,
    }),
    config
  );
}
