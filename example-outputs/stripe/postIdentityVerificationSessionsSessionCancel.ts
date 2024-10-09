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

export const postIdentityVerificationSessionsSessionCancelEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}/cancel',
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
