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
} from './core';
import {Deleted_external_account, Error} from './schemas';

export const deleteAccountsAccountExternalAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts/{id}',
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

export type DeleteAccountsAccountExternalAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    id: string;
  }
>;

export type DeleteAccountsAccountExternalAccountsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_external_account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteAccountsAccountExternalAccountsIdRequestResult =
  RequestResult<
    DeleteAccountsAccountExternalAccountsIdRequest,
    DeleteAccountsAccountExternalAccountsIdResponse
  >;

export function deleteAccountsAccountExternalAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteAccountsAccountExternalAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteAccountsAccountExternalAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteAccountsAccountExternalAccountsIdEndpointSchema,
      payload
    ),
    config
  );
}
