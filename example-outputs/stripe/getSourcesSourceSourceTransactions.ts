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
import {Source_transaction, Error} from '@example-outputs/stripe';

export const getSourcesSourceSourceTransactionsEndpointSchema = {
  path: '/v1/sources/{source}/source_transactions',
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

export type GetSourcesSourceSourceTransactionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    source: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetSourcesSourceSourceTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Source_transaction[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceSourceTransactionsRequestResult = RequestResult<
  GetSourcesSourceSourceTransactionsRequest,
  GetSourcesSourceSourceTransactionsResponse
>;

export function getSourcesSourceSourceTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceSourceTransactionsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceSourceTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getSourcesSourceSourceTransactionsEndpointSchema, payload),
    config
  );
}
