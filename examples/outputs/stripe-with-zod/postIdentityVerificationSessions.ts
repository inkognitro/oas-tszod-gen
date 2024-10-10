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

export const postIdentityVerificationSessionsEndpointSchema = {
  path: '/v1/identity/verification_sessions',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        client_reference_id: z.string().optional(),
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
        related_customer: z.string().optional(),
        return_url: z.string().optional(),
        type: z.enum(['document', 'id_number']).optional(),
        verification_flow: z.string().optional(),
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
