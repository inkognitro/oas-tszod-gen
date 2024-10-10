import {
  z_Identity_Verification_report,
  Identity_Verification_report,
} from './identity';
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

export const getIdentityVerificationReportsReportEndpointSchema = {
  path: '/v1/identity/verification_reports/{report}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    report: z.string(),
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
          zodSchema: z_Identity_Verification_report,
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
