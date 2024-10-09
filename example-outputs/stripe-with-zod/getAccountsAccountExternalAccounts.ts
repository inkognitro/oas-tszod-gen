import {
  z_Bank_account,
  z_Card,
  z_Error,
  Bank_account,
  Card,
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

export const getAccountsAccountExternalAccountsEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    object: z.enum(['bank_account', 'card']).optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z.union([z_Bank_account, z_Card])),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

export type GetAccountsAccountExternalAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    object?: 'bank_account' | 'card';
    starting_after?: string;
  }
>;

export type GetAccountsAccountExternalAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: ((Bank_account | Card) &
            (Partial<Bank_account> & Partial<Card>))[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountExternalAccountsRequestResult = RequestResult<
  GetAccountsAccountExternalAccountsRequest,
  GetAccountsAccountExternalAccountsResponse
>;

export function getAccountsAccountExternalAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountExternalAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountExternalAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountExternalAccountsEndpointSchema, payload),
    config
  );
}
