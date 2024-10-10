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
import {Financial_connections_Account_owner} from './financial_connections';
import {Error} from './schemas';

export const getFinancialConnectionsAccountsAccountOwnersEndpointSchema = {
  path: '/v1/financial_connections/accounts/{account}/owners',
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
