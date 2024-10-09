import {
  z_Person,
  z_Error,
  Person,
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

export const getAccountsAccountPeoplePersonEndpointSchema = {
  path: '/v1/accounts/{account}/people/{person}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Person,
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
