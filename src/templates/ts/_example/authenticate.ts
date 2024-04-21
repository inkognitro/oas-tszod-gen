import {
  createRequest,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
  StatusCode,
} from '../core';

export const authenticateEndpointId = {
  method: 'post',
  path: '/v1/auth/authenticate',
};

type OkAuthenticateResponse = Response<StatusCode.Ok, {accessToken: string}>;
type BadRequestAuthenticateResponse = Response<StatusCode.BadRequest>;

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  Request,
  AuthenticateResponse
>;

export type AuthenticatePayload = {
  emailOrUsername: string;
  password: string;
};

export function authenticate(
  requestHandler: RequestHandler,
  payload: AuthenticatePayload,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const request = createRequest({
    endpointId: authenticateEndpointId,
    contentType: 'application/json',
    body: {
      emailOrUsername: payload.emailOrUsername,
      password: payload.password,
    },
  });
  return requestHandler.execute(request, config);
}
