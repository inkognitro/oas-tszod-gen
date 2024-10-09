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
import {Reporting_Report_run, Error} from '@example-outputs/stripe';

export const getReportingReportRunsReportRunEndpointSchema = {
  path: '/v1/reporting/report_runs/{report_run}',
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

export type GetReportingReportRunsReportRunRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    report_run: string;
  },
  {
    expand?: string[];
  }
>;

export type GetReportingReportRunsReportRunResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Reporting_Report_run>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetReportingReportRunsReportRunRequestResult = RequestResult<
  GetReportingReportRunsReportRunRequest,
  GetReportingReportRunsReportRunResponse
>;

export function getReportingReportRunsReportRun(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetReportingReportRunsReportRunRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetReportingReportRunsReportRunRequestResult> {
  return requestHandler.execute(
    createRequest(getReportingReportRunsReportRunEndpointSchema, payload),
    config
  );
}
