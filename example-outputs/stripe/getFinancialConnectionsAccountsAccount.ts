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

export const getFinancialConnectionsAccountsAccountEndpointSchema = {
  path: '/v1/financial_connections/accounts/{account}',
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

export type GetFinancialConnectionsAccountsAccountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetFinancialConnectionsAccountsAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Account>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsAccountsAccountRequestResult = RequestResult<
  GetFinancialConnectionsAccountsAccountRequest,
  GetFinancialConnectionsAccountsAccountResponse
>;

export function getFinancialConnectionsAccountsAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsAccountsAccountRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsAccountsAccountRequestResult> {
  return requestHandler.execute(
    createRequest(
      getFinancialConnectionsAccountsAccountEndpointSchema,
      payload
    ),
    config
  );
}
