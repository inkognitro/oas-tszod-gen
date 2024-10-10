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

export const postIdentityVerificationSessionsSessionRedactEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}/redact',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    session: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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

export type PostIdentityVerificationSessionsSessionRedactRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    session: string;
  }
>;

export type PostIdentityVerificationSessionsSessionRedactResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIdentityVerificationSessionsSessionRedactRequestResult =
  RequestResult<
    PostIdentityVerificationSessionsSessionRedactRequest,
    PostIdentityVerificationSessionsSessionRedactResponse
  >;

export function postIdentityVerificationSessionsSessionRedact(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIdentityVerificationSessionsSessionRedactRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIdentityVerificationSessionsSessionRedactRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIdentityVerificationSessionsSessionRedactEndpointSchema,
      payload
    ),
    config
  );
}
