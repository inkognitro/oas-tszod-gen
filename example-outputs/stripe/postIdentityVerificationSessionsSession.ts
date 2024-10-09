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

export const postIdentityVerificationSessionsSessionEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}',
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

export type PostIdentityVerificationSessionsSessionRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
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
      type?: 'document' | 'id_number';
    }
  >,
  {
    session: string;
  }
>;

export type PostIdentityVerificationSessionsSessionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIdentityVerificationSessionsSessionRequestResult =
  RequestResult<
    PostIdentityVerificationSessionsSessionRequest,
    PostIdentityVerificationSessionsSessionResponse
  >;

export function postIdentityVerificationSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIdentityVerificationSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIdentityVerificationSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIdentityVerificationSessionsSessionEndpointSchema,
      payload
    ),
    config
  );
}
