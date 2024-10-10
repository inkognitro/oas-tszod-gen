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
import {Treasury_Transaction} from './treasury';
import {Error} from './schemas';

export const getTreasuryTransactionsIdEndpointSchema = {
  path: '/v1/treasury/transactions/{id}',
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

export type GetTreasuryTransactionsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetTreasuryTransactionsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryTransactionsIdRequestResult = RequestResult<
  GetTreasuryTransactionsIdRequest,
  GetTreasuryTransactionsIdResponse
>;

export function getTreasuryTransactionsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryTransactionsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryTransactionsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryTransactionsIdEndpointSchema, payload),
    config
  );
}
