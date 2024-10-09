import {
  z_Financial_connections_Account_owner,
  z_Error,
  Financial_connections_Account_owner,
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

export const getFinancialConnectionsAccountsAccountOwnersEndpointSchema = {
  path: '/v1/financial_connections/accounts/{account}/owners',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    ownership: z.string(),
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
            data: z.array(z_Financial_connections_Account_owner),
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

export type GetFinancialConnectionsAccountsAccountOwnersRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    ownership: string;
    starting_after?: string;
  }
>;

export type GetFinancialConnectionsAccountsAccountOwnersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Account_owner[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsAccountsAccountOwnersRequestResult =
  RequestResult<
    GetFinancialConnectionsAccountsAccountOwnersRequest,
    GetFinancialConnectionsAccountsAccountOwnersResponse
  >;

export function getFinancialConnectionsAccountsAccountOwners(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsAccountsAccountOwnersRequest,
    'pathParams' | 'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsAccountsAccountOwnersRequestResult> {
  return requestHandler.execute(
    createRequest(
      getFinancialConnectionsAccountsAccountOwnersEndpointSchema,
      payload
    ),
    config
  );
}
