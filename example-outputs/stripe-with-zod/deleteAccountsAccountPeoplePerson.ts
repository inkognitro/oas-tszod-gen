import {
  z_Deleted_person,
  z_Error,
  Deleted_person,
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

export const deleteAccountsAccountPeoplePersonEndpointSchema = {
  path: '/v1/accounts/{account}/people/{person}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
    person: z.string(),
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
          zodSchema: z_Deleted_person,
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

export type DeleteAccountsAccountPeoplePersonRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    person: string;
  }
>;

export type DeleteAccountsAccountPeoplePersonResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteAccountsAccountPeoplePersonRequestResult = RequestResult<
  DeleteAccountsAccountPeoplePersonRequest,
  DeleteAccountsAccountPeoplePersonResponse
>;

export function deleteAccountsAccountPeoplePerson(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteAccountsAccountPeoplePersonRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteAccountsAccountPeoplePersonRequestResult> {
  return requestHandler.execute(
    createRequest(deleteAccountsAccountPeoplePersonEndpointSchema, payload),
    config
  );
}
