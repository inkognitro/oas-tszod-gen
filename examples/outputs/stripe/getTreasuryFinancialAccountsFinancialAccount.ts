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
import {Treasury_Financial_account} from './treasury';
import {Error} from './schemas';

export const getTreasuryFinancialAccountsFinancialAccountEndpointSchema = {
  path: '/v1/treasury/financial_accounts/{financial_account}',
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
