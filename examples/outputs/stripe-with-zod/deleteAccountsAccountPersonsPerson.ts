import {z_Deleted_person, z_Error, Deleted_person, Error} from './schemas';
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

export const deleteAccountsAccountPersonsPersonEndpointSchema = {
  path: '/v1/accounts/{account}/persons/{person}',
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
