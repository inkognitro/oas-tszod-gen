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

export const getIdentityVerificationSessionsSessionEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    session: z.string(),
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

export type GetIdentityVerificationSessionsSessionRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    session: string;
  },
  {
    expand?: string[];
  }
>;

export type GetIdentityVerificationSessionsSessionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Identity_Verification_session>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetIdentityVerificationSessionsSessionRequestResult = RequestResult<
  GetIdentityVerificationSessionsSessionRequest,
  GetIdentityVerificationSessionsSessionResponse
>;

export function getIdentityVerificationSessionsSession(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetIdentityVerificationSessionsSessionRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetIdentityVerificationSessionsSessionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getIdentityVerificationSessionsSessionEndpointSchema,
      payload
    ),
    config
  );
}
