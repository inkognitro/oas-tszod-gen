import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2/core';

export const deleteUserEndpointSchema = {
  path: '/user/{username}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '400': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
  },
};

export type DeleteUserRequest = RequestUnion<
  any,
  {
    username: string;
  }
>;

export type DeleteUserResponse = Response<400> | Response<404>;

export type DeleteUserRequestResult = RequestResult<
  DeleteUserRequest,
  DeleteUserResponse
>;

export function deleteUser(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteUserRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserRequestResult> {
  return requestHandler.execute(
    createRequest(deleteUserEndpointSchema, payload),
    config
  );
}
