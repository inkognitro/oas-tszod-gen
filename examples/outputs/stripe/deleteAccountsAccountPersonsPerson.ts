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
import {Deleted_person, Error} from './schemas';

export const deleteAccountsAccountPersonsPersonEndpointSchema = {
  path: '/v1/accounts/{account}/persons/{person}',
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

export type DeleteAccountsAccountPersonsPersonRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    person: string;
  }
>;

export type DeleteAccountsAccountPersonsPersonResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteAccountsAccountPersonsPersonRequestResult = RequestResult<
  DeleteAccountsAccountPersonsPersonRequest,
  DeleteAccountsAccountPersonsPersonResponse
>;

export function deleteAccountsAccountPersonsPerson(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteAccountsAccountPersonsPersonRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteAccountsAccountPersonsPersonRequestResult> {
  return requestHandler.execute(
    createRequest(deleteAccountsAccountPersonsPersonEndpointSchema, payload),
    config
  );
}
