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

export const getAccountsAccountPersonsPersonEndpointSchema = {
  path: '/v1/accounts/{account}/persons/{person}',
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
