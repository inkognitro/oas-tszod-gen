import {
  z_Financial_connections_Transaction,
  Financial_connections_Transaction,
} from './financial_connections';
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

export const getFinancialConnectionsTransactionsTransactionEndpointSchema = {
  path: '/v1/financial_connections/transactions/{transaction}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    transaction: z.string(),
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
          zodSchema: z_Financial_connections_Transaction,
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
