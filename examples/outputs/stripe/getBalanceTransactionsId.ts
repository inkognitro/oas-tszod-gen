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
import {Balance_transaction, Error} from './schemas';

export const getBalanceTransactionsIdEndpointSchema = {
  path: '/v1/balance_transactions/{id}',
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

export type GetBalanceTransactionsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBalanceTransactionsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBalanceTransactionsIdRequestResult = RequestResult<
  GetBalanceTransactionsIdRequest,
  GetBalanceTransactionsIdResponse
>;

export function getBalanceTransactionsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBalanceTransactionsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBalanceTransactionsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBalanceTransactionsIdEndpointSchema, payload),
    config
  );
}
