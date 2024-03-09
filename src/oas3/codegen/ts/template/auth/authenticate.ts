import {
  createRequest,
  EndpointId,
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
  Response,
  StatusCode,
} from '../core';

export const authenticateEndpointId: EndpointId = {
  method: 'post',
  path: '/v1/authenticate',
};

export type AuthenticateRequest = Request & {
  username: string;
  password: string;
};

type OkAuthenticateResponse = Response<StatusCode.OK, {accessToken: string}>;
type BadRequestAuthenticateResponse = Response<StatusCode.BAD_REQUEST>;

export type AuthenticateResponse =
  | OkAuthenticateResponse
  | BadRequestAuthenticateResponse;

export type AuthenticateRequestResult = RequestResult<
  AuthenticateRequest,
  AuthenticateResponse
>;

export type AuthenticateParams = {
  emailOrUsername: string;
  password: string;
};

export function authenticate(
  requestHandler: RequestHandler,
  params: AuthenticateParams,
  config?: RequestExecutionConfig
): Promise<AuthenticateRequestResult> {
  const request = createRequest({
    endpointId: authenticateEndpointId,
    body: {
      emailOrUsername: params.emailOrUsername,
      password: params.password,
    },
  });
  return requestHandler.execute(request, config);
}
