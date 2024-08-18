import {
  createRequest,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
} from '../core';

export const authenticateEndpointId = {
  method: 'post',
  path: '/v1/auth/authenticate',
};

type OkAuthenticateResponse = Response<200, {accessToken: string}>;
type BadRequestAuthenticateResponse = Response<400>;

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  Request,
  AuthenticateResponse
>;

export type AuthenticatePayload = {
  headers: {
    foo: string;
  };
  body: {
    emailOrUsername: string;
    password: string;
  };
};

export function authenticate(
  requestHandler: RequestHandler,
  payload: AuthenticatePayload,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const request = createRequest({
    endpointId: authenticateEndpointId,
    headers: {
      ...payload.headers,
      'Content-Type': 'application/json',
    },
    body: payload.body,
  });
  return requestHandler.execute(request, config);
}
