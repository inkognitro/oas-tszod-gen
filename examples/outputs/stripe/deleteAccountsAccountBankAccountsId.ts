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

export const deleteAccountsAccountBankAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts/{id}',
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

export type DeleteAccountsAccountBankAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    id: string;
  }
>;

export type DeleteAccountsAccountBankAccountsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_external_account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteAccountsAccountBankAccountsIdRequestResult = RequestResult<
  DeleteAccountsAccountBankAccountsIdRequest,
  DeleteAccountsAccountBankAccountsIdResponse
>;

export function deleteAccountsAccountBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteAccountsAccountBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteAccountsAccountBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteAccountsAccountBankAccountsIdEndpointSchema, payload),
    config
  );
}
