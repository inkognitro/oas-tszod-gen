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
import {Treasury_Transaction_entry} from './treasury';
import {Error} from './schemas';

export const getTreasuryTransactionEntriesIdEndpointSchema = {
  path: '/v1/treasury/transaction_entries/{id}',
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

export type GetTreasuryTransactionEntriesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryTransactionEntriesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Transaction_entry>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionEntriesIdRequestResult = RequestResult<
  GetTreasuryTransactionEntriesIdRequest,
  GetTreasuryTransactionEntriesIdResponse
>;

export function getTreasuryTransactionEntriesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionEntriesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionEntriesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionEntriesIdEndpointSchema, payload),
    config
  );
}
