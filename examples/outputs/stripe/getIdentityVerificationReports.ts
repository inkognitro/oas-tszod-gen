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
import {Identity_Verification_report} from './identity';
import {Error} from './schemas';

export const getIdentityVerificationReportsEndpointSchema = {
  path: '/v1/identity/verification_reports',
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

export type GetIdentityVerificationReportsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    client_reference_id?: string;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    type?: 'document' | 'id_number';
    verification_session?: string;
  }
>;

export type GetIdentityVerificationReportsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Identity_Verification_report[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIdentityVerificationReportsRequestResult = RequestResult<
  GetIdentityVerificationReportsRequest,
  GetIdentityVerificationReportsResponse
>;

export function getIdentityVerificationReports(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIdentityVerificationReportsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIdentityVerificationReportsRequestResult> {
  return requestHandler.execute(
    createRequest(getIdentityVerificationReportsEndpointSchema, payload),
    config
  );
}
