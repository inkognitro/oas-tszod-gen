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
} from '@example-outputs/stripe/core';
import {Financial_connections_Account, Error} from '@example-outputs/stripe';

export const getFinancialConnectionsAccountsEndpointSchema = {
  path: '/v1/financial_connections/accounts',
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
