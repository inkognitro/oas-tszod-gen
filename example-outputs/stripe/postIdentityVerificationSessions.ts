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
import {Identity_Verification_session, Error} from '@example-outputs/stripe';

export const postIdentityVerificationSessionsEndpointSchema = {
  path: '/v1/identity/verification_sessions',
  method: 'post',
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

export type PostIdentityVerificationSessionsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      client_reference_id?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      options?: {
        document?: (
          | {
              allowed_types?: ('driving_license' | 'id_card' | 'passport')[];
              require_id_number?: boolean;
              require_live_capture?: boolean;
              require_matching_selfie?: boolean;
            }
          | ''
        ) &
          Partial<{
            allowed_types?: ('driving_license' | 'id_card' | 'passport')[];
            require_id_number?: boolean;
            require_live_capture?: boolean;
            require_matching_selfie?: boolean;
          }>;
      };
      provided_details?: {
        email?: string;
        phone?: string;
      };
      related_customer?: string;
      return_url?: string;
      type?: 'document' | 'id_number';
      verification_flow?: string;
    }
  >
>;

export type PostIdentityVerificationSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIdentityVerificationSessionsRequestResult = RequestResult<
  PostIdentityVerificationSessionsRequest,
  PostIdentityVerificationSessionsResponse
>;

export function postIdentityVerificationSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIdentityVerificationSessionsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIdentityVerificationSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(postIdentityVerificationSessionsEndpointSchema, payload),
    config
  );
}
