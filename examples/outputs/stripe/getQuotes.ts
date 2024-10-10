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
import {Quote, Error} from './schemas';

export const getQuotesEndpointSchema = {
  path: '/v1/quotes',
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

export type GetQuotesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    customer?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    status?: 'accepted' | 'canceled' | 'draft' | 'open';
    test_clock?: string;
  }
>;

export type GetQuotesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Quote[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetQuotesRequestResult = RequestResult<
  GetQuotesRequest,
  GetQuotesResponse
>;

export function getQuotes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetQuotesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetQuotesRequestResult> {
  return requestHandler.execute(
    createRequest(getQuotesEndpointSchema, payload),
    config
  );
}
