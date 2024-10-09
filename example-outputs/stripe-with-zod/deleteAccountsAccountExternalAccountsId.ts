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

export const deleteAccountsAccountExternalAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts/{id}',
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
