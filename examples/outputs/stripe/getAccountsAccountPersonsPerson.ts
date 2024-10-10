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

export const getAccountsAccountPersonsPersonEndpointSchema = {
  path: '/v1/accounts/{account}/persons/{person}',
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

export type GetAccountsAccountPersonsPersonRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    person: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountPersonsPersonResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Person>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountPersonsPersonRequestResult = RequestResult<
  GetAccountsAccountPersonsPersonRequest,
  GetAccountsAccountPersonsPersonResponse
>;

export function getAccountsAccountPersonsPerson(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountPersonsPersonRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountPersonsPersonRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountPersonsPersonEndpointSchema, payload),
    config
  );
}
