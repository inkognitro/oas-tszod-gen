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

export const getIdentityVerificationSessionsSessionEndpointSchema = {
  path: '/v1/identity/verification_sessions/{session}',
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
