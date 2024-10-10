import {z_Deleted_account, z_Error, Deleted_account, Error} from './schemas';
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
} from './core';

export const deleteAccountsAccountEndpointSchema = {
  path: '/v1/accounts/{account}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
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
          zodSchema: z_Deleted_account,
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
