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

export const postIssuingTransactionsTransactionEndpointSchema = {
  path: '/v1/issuing/transactions/{transaction}',
  method: 'post',
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

export type PostIssuingTransactionsTransactionRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    transaction: string;
  }
>;

export type PostIssuingTransactionsTransactionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Issuing_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIssuingTransactionsTransactionRequestResult = RequestResult<
  PostIssuingTransactionsTransactionRequest,
  PostIssuingTransactionsTransactionResponse
>;

export function postIssuingTransactionsTransaction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIssuingTransactionsTransactionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIssuingTransactionsTransactionRequestResult> {
  return requestHandler.execute(
    createRequest(postIssuingTransactionsTransactionEndpointSchema, payload),
    config
  );
}
