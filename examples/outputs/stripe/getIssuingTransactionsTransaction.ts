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
import {Issuing_Transaction} from './issuing';
import {Error} from './schemas';

export const getIssuingTransactionsTransactionEndpointSchema = {
  path: '/v1/issuing/transactions/{transaction}',
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

export type GetIssuingTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    transaction: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIssuingTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIssuingTransactionsTransactionRequestResult = RequestResult<
  GetIssuingTransactionsTransactionRequest,
  GetIssuingTransactionsTransactionResponse
>;

export function getIssuingTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIssuingTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIssuingTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(getIssuingTransactionsTransactionEndpointSchema, payload),
    config
  );
}
