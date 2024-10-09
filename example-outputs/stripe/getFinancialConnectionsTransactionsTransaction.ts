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
import {
  Financial_connections_Transaction,
  Error,
} from '@example-outputs/stripe';

export const getFinancialConnectionsTransactionsTransactionEndpointSchema = {
  path: '/v1/financial_connections/transactions/{transaction}',
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

export type GetFinancialConnectionsTransactionsTransactionRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      transaction: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetFinancialConnectionsTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Financial_connections_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetFinancialConnectionsTransactionsTransactionRequestResult =
  RequestResult<
    GetFinancialConnectionsTransactionsTransactionRequest,
    GetFinancialConnectionsTransactionsTransactionResponse
  >;

export function getFinancialConnectionsTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetFinancialConnectionsTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetFinancialConnectionsTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getFinancialConnectionsTransactionsTransactionEndpointSchema,
      payload
    ),
    config
  );
}
