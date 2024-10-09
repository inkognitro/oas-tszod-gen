import {
  z_External_account,
  z_Error,
  External_account,
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

export const getAccountsAccountExternalAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    account: z.string(),
    id: z.string(),
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
          zodSchema: z_External_account,
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

export type GetAccountsAccountExternalAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountExternalAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountExternalAccountsIdRequestResult = RequestResult<
  GetAccountsAccountExternalAccountsIdRequest,
  GetAccountsAccountExternalAccountsIdResponse
>;

export function getAccountsAccountExternalAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountExternalAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountExternalAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountExternalAccountsIdEndpointSchema, payload),
    config
  );
}
