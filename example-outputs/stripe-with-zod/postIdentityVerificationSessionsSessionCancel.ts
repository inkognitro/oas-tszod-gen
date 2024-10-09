import {
  z_Identity_Verification_session,
  z_Error,
  Identity_Verification_session,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postIdentityVerificationSessionsSessionCancelEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}/cancel',
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

export type PostIdentityVerificationSessionsSessionCancelRequest = RequestUnion<
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

export type PostIdentityVerificationSessionsSessionCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostIdentityVerificationSessionsSessionCancelRequestResult =
  RequestResult<
    PostIdentityVerificationSessionsSessionCancelRequest,
    PostIdentityVerificationSessionsSessionCancelResponse
  >;

export function postIdentityVerificationSessionsSessionCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostIdentityVerificationSessionsSessionCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostIdentityVerificationSessionsSessionCancelRequestResult> {
  return requestHandler.execute(
    createRequest(
      postIdentityVerificationSessionsSessionCancelEndpointSchema,
      payload
    ),
    config
  );
}
