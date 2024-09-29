import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type DeleteUserPayload = {
  pathParams: {
    username: string;
  };
};

export type DeleteUserResponse = Response<400> | Response<404>;

export type DeleteUserRequestResult = RequestResult<
  Request,
  DeleteUserResponse
>;

export function deleteUser(
  requestHandler: SimpleRequestHandler,
  payload: DeleteUserPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: deleteUserEndpointSchema}),
    config
  );
}
