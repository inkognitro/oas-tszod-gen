import {z_External_account, z_Error, External_account, Error} from './schemas';
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

export const getAccountsAccountBankAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts/{id}',
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

export type GetAccountsAccountBankAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountBankAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountBankAccountsIdRequestResult = RequestResult<
  GetAccountsAccountBankAccountsIdRequest,
  GetAccountsAccountBankAccountsIdResponse
>;

export function getAccountsAccountBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountBankAccountsIdEndpointSchema, payload),
    config
  );
}
