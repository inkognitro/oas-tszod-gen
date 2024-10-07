import {
  Request,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const logoutUserEndpointSchema = {
  path: '/user/logout',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    default: {
      bodyByContentType: {},
    },
  },
};

export type LogoutUserRequest = Request;

export type LogoutUserResponse = Response;

export type LogoutUserRequestResult = RequestResult<
  LogoutUserRequest,
  LogoutUserResponse
>;

export function logoutUser(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<LogoutUserRequestResult> {
  return requestHandler.execute(
    createRequest(logoutUserEndpointSchema),
    config
  );
}
