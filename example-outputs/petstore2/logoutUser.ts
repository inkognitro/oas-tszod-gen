import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
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

export type LogoutUserResponse = Response;

export type LogoutUserRequestResult = RequestResult<
  Request,
  LogoutUserResponse
>;

export function logoutUser(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<LogoutUserRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: logoutUserEndpointSchema}),
    config
  );
}
