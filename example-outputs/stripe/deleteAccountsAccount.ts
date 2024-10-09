import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe/core';
import {Deleted_account, Error} from '@example-outputs/stripe';

export const deleteAccountsAccountEndpointSchema = {
  path: '/v1/accounts/{account}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type DeleteAccountsAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  }
>;

export type DeleteAccountsAccountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteAccountsAccountRequestResult = RequestResult<
  DeleteAccountsAccountRequest,
  DeleteAccountsAccountResponse
>;

export function deleteAccountsAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteAccountsAccountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteAccountsAccountRequestResult> {
  return requestHandler.execute(
    createRequest(deleteAccountsAccountEndpointSchema, payload),
    config
  );
}
