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
import {Reporting_Report_type, Error} from '@example-outputs/stripe';

export const getReportingReportTypesEndpointSchema = {
  path: '/v1/reporting/report_types',
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

export type GetReportingReportTypesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
  }
>;

export type GetReportingReportTypesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Reporting_Report_type[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetReportingReportTypesRequestResult = RequestResult<
  GetReportingReportTypesRequest,
  GetReportingReportTypesResponse
>;

export function getReportingReportTypes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetReportingReportTypesRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetReportingReportTypesRequestResult> {
  return requestHandler.execute(
    createRequest(getReportingReportTypesEndpointSchema, payload),
    config
  );
}
