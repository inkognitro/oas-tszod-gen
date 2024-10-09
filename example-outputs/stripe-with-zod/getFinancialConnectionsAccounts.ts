import {
  z_Financial_connections_Account,
  z_Error,
  Financial_connections_Account,
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

export const getFinancialConnectionsAccountsEndpointSchema = {
  path: '/v1/financial_connections/accounts',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    account_holder: z
      .object({
        account: z.string().optional(),
        customer: z.string().optional(),
      })
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    session: z.string().optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Financial_connections_Account),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/financial_connections\/accounts/),
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

export type GetFinancialConnectionsAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    account_holder?: {
      account?: string;
      customer?: string;
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    session?: string;
    starting_after?: string;
  }
>;

export type GetFinancialConnectionsAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Account[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsAccountsRequestResult = RequestResult<
  GetFinancialConnectionsAccountsRequest,
  GetFinancialConnectionsAccountsResponse
>;

export function getFinancialConnectionsAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsAccountsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getFinancialConnectionsAccountsEndpointSchema, payload),
    config
  );
}
