import {
  z_Deleted_external_account,
  z_Error,
  Deleted_external_account,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const deleteAccountsAccountBankAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Deleted_external_account,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
