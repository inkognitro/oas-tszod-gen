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
import {Identity_Verification_report, Error} from '@example-outputs/stripe';

export const getIdentityVerificationReportsReportEndpointSchema = {
  path: '/v1/identity/verification_reports/{report}',
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

export type GetIdentityVerificationReportsReportRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    report: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIdentityVerificationReportsReportResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_report>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIdentityVerificationReportsReportRequestResult = RequestResult<
  GetIdentityVerificationReportsReportRequest,
  GetIdentityVerificationReportsReportResponse
>;

export function getIdentityVerificationReportsReport(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIdentityVerificationReportsReportRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIdentityVerificationReportsReportRequestResult> {
  return requestHandler.execute(
    createRequest(getIdentityVerificationReportsReportEndpointSchema, payload),
    config
  );
}
