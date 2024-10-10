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
import {Reporting_Report_type} from './reporting';
import {Error} from './schemas';

export const getReportingReportTypesReportTypeEndpointSchema = {
  path: '/v1/reporting/report_types/{report_type}',
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
