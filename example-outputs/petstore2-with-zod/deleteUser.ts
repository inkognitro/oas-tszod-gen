import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const deleteUserEndpointSchema = {
  path: '/user/{username}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    username: z.string(),
  }),
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

export type DeleteUserResponse = ResponseUnion<400> | ResponseUnion<404>;

export type DeleteUserRequestResult = RequestResult<
  DeleteUserRequest,
  DeleteUserResponse
>;

export function deleteUser(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteUserRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserRequestResult> {
  return requestHandler.execute(
    createRequest(deleteUserEndpointSchema, payload),
    config
  );
}
