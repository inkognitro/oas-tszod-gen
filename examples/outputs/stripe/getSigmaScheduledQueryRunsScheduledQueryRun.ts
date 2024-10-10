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
import {Scheduled_query_run, Error} from './schemas';

export const getSigmaScheduledQueryRunsScheduledQueryRunEndpointSchema = {
  path: '/v1/sigma/scheduled_query_runs/{scheduled_query_run}',
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

export type GetSigmaScheduledQueryRunsScheduledQueryRunRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    scheduled_query_run: string;
  },
  {
    expand?: string[];
  }
>;

export type GetSigmaScheduledQueryRunsScheduledQueryRunResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Scheduled_query_run>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSigmaScheduledQueryRunsScheduledQueryRunRequestResult =
  RequestResult<
    GetSigmaScheduledQueryRunsScheduledQueryRunRequest,
    GetSigmaScheduledQueryRunsScheduledQueryRunResponse
  >;

export function getSigmaScheduledQueryRunsScheduledQueryRun(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSigmaScheduledQueryRunsScheduledQueryRunRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSigmaScheduledQueryRunsScheduledQueryRunRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSigmaScheduledQueryRunsScheduledQueryRunEndpointSchema,
      payload
    ),
    config
  );
}
