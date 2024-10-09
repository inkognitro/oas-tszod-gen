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
import {Deleted_person, Error} from '@example-outputs/stripe';

export const deleteAccountsAccountPeoplePersonEndpointSchema = {
  path: '/v1/accounts/{account}/people/{person}',
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
