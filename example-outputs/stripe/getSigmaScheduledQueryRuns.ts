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
import {Scheduled_query_run, Error} from '@example-outputs/stripe';

export const getSigmaScheduledQueryRunsEndpointSchema = {
  path: '/v1/sigma/scheduled_query_runs',
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

export type GetSigmaScheduledQueryRunsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetSigmaScheduledQueryRunsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Scheduled_query_run[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSigmaScheduledQueryRunsRequestResult = RequestResult<
  GetSigmaScheduledQueryRunsRequest,
  GetSigmaScheduledQueryRunsResponse
>;

export function getSigmaScheduledQueryRuns(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSigmaScheduledQueryRunsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSigmaScheduledQueryRunsRequestResult> {
  return requestHandler.execute(
    createRequest(getSigmaScheduledQueryRunsEndpointSchema, payload),
    config
  );
}
