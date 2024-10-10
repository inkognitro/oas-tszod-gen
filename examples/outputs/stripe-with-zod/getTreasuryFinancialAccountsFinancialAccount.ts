import {
  z_Treasury_Financial_account,
  Treasury_Financial_account,
} from './treasury';
import {z_Error, Error} from './schemas';
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

export const getTreasuryFinancialAccountsFinancialAccountEndpointSchema = {
  path: '/v1/treasury/financial_accounts/{financial_account}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    financial_account: z.string(),
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
          zodSchema: z_Treasury_Financial_account,
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

export type GetTreasuryFinancialAccountsFinancialAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    financial_account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryFinancialAccountsFinancialAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Financial_account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryFinancialAccountsFinancialAccountRequestResult =
  RequestResult<
    GetTreasuryFinancialAccountsFinancialAccountRequest,
    GetTreasuryFinancialAccountsFinancialAccountResponse
  >;

export function getTreasuryFinancialAccountsFinancialAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryFinancialAccountsFinancialAccountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryFinancialAccountsFinancialAccountRequestResult> {
  return requestHandler.execute(
    createRequest(
      getTreasuryFinancialAccountsFinancialAccountEndpointSchema,
      payload
    ),
    config
  );
}
