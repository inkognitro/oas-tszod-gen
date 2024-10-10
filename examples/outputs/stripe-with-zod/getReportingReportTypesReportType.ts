import {z_Reporting_Report_type, Reporting_Report_type} from './reporting';
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

export const getReportingReportTypesReportTypeEndpointSchema = {
  path: '/v1/reporting/report_types/{report_type}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    report_type: z.string(),
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
          zodSchema: z_Reporting_Report_type,
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

export type GetReportingReportTypesReportTypeRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    report_type: string;
  },
  {
    expand?: string[];
  }
>;

export type GetReportingReportTypesReportTypeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Reporting_Report_type>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetReportingReportTypesReportTypeRequestResult = RequestResult<
  GetReportingReportTypesReportTypeRequest,
  GetReportingReportTypesReportTypeResponse
>;

export function getReportingReportTypesReportType(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetReportingReportTypesReportTypeRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetReportingReportTypesReportTypeRequestResult> {
  return requestHandler.execute(
    createRequest(getReportingReportTypesReportTypeEndpointSchema, payload),
    config
  );
}
