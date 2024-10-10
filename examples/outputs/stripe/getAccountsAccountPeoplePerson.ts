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
import {Person, Error} from './schemas';

export const getAccountsAccountPeoplePersonEndpointSchema = {
  path: '/v1/accounts/{account}/people/{person}',
  method: 'get',
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

export type GetAccountsAccountPeoplePersonRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    person: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountPeoplePersonResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountPeoplePersonRequestResult = RequestResult<
  GetAccountsAccountPeoplePersonRequest,
  GetAccountsAccountPeoplePersonResponse
>;

export function getAccountsAccountPeoplePerson(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountPeoplePersonRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountPeoplePersonRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountPeoplePersonEndpointSchema, payload),
    config
  );
}
