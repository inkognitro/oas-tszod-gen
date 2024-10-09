import {
  z_Account,
  z_Error,
  Account,
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

export const getAccountsAccountEndpointSchema = {
  path: '/v1/accounts/{account}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Account,
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

export type GetAccountsAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountRequestResult = RequestResult<
  GetAccountsAccountRequest,
  GetAccountsAccountResponse
>;

export function getAccountsAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountEndpointSchema, payload),
    config
  );
}
