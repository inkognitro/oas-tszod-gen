import {z_Reporting_Report_run, Reporting_Report_run} from './reporting';
import {z_Error, Error} from './schemas';
import {z} from 'zod';
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

export const getReportingReportRunsReportRunEndpointSchema = {
  path: '/v1/reporting/report_runs/{report_run}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    report_run: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Reporting_Report_run,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
