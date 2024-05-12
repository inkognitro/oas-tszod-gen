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
  xHeader: string;
  emailOrUsername: string;
  password: string;
};

export function authenticate(
  requestHandler: RequestHandler,
  payload: AuthenticatePayload,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const {xHeader, ...body} = payload;
  const request = createRequest({
    endpointId: authenticateEndpointId,
    headers: {
      'Content-Type': 'application/json',
      x: xHeader,
    },
    body: body,
  });
  return requestHandler.execute(request, config);
}
