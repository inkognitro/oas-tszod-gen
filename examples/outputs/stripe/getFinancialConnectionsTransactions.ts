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
import {Financial_connections_Transaction} from './financial_connections';
import {Error} from './schemas';

export const getFinancialConnectionsTransactionsEndpointSchema = {
  path: '/v1/financial_connections/transactions',
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

export type GetFinancialConnectionsTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    account: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    transacted_at?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    transaction_refresh?: {
      after: string;
    };
  }
>;

export type GetFinancialConnectionsTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Financial_connections_Transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsTransactionsRequestResult = RequestResult<
  GetFinancialConnectionsTransactionsRequest,
  GetFinancialConnectionsTransactionsResponse
>;

export function getFinancialConnectionsTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsTransactionsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getFinancialConnectionsTransactionsEndpointSchema, payload),
    config
  );
}
