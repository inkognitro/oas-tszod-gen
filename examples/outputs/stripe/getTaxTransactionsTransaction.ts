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
import {Tax_Transaction} from './tax';
import {Error} from './schemas';

export const getTaxTransactionsTransactionEndpointSchema = {
  path: '/v1/tax/transactions/{transaction}',
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

export type GetTaxTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTaxTransactionsTransactionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTaxTransactionsTransactionRequestResult = RequestResult<
  GetTaxTransactionsTransactionRequest,
  GetTaxTransactionsTransactionResponse
>;

export function getTaxTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTaxTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTaxTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(getTaxTransactionsTransactionEndpointSchema, payload),
    config
  );
}
