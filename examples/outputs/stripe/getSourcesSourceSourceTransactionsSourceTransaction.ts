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
import {Source_transaction, Error} from './schemas';

export const getSourcesSourceSourceTransactionsSourceTransactionEndpointSchema =
  {
    path: '/v1/sources/{source}/source_transactions/{source_transaction}',
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

export type GetSourcesSourceSourceTransactionsSourceTransactionRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      source: string;
      source_transaction: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetSourcesSourceSourceTransactionsSourceTransactionResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Source_transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceSourceTransactionsSourceTransactionRequestResult =
  RequestResult<
    GetSourcesSourceSourceTransactionsSourceTransactionRequest,
    GetSourcesSourceSourceTransactionsSourceTransactionResponse
  >;

export function getSourcesSourceSourceTransactionsSourceTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceSourceTransactionsSourceTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceSourceTransactionsSourceTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSourcesSourceSourceTransactionsSourceTransactionEndpointSchema,
      payload
    ),
    config
  );
}
