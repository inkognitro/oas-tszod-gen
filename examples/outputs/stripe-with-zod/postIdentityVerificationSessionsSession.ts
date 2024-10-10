import {
  z_Identity_Verification_session,
  Identity_Verification_session,
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

export const postIdentityVerificationSessionsSessionEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    session: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        options: z
          .object({
            document: z
              .union([
                z.object({
                  allowed_types: z
                    .array(z.enum(['driving_license', 'id_card', 'passport']))
                    .optional(),
                  require_id_number: z.boolean().optional(),
                  require_live_capture: z.boolean().optional(),
                  require_matching_selfie: z.boolean().optional(),
                }),
                z.enum(['']),
              ])
              .optional(),
          })
          .optional(),
        provided_details: z
          .object({
            email: z.string().optional(),
            phone: z.string().optional(),
          })
          .optional(),
        type: z.enum(['document', 'id_number']).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Identity_Verification_session,
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
