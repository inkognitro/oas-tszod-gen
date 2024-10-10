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
import {Identity_Verification_session} from './identity';
import {Error} from './schemas';

export const postIdentityVerificationSessionsSessionRedactEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}/redact',
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
