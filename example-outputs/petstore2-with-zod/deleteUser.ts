import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type DeleteUserPayload = {
  pathParams: {
    username: string;
  };
};

export type DeleteUserResponse = Response<400, any> | Response<404, any>;

export type DeleteUserRequestResult = RequestResult<
  Request,
  DeleteUserResponse
>;

export function deleteUser(
  requestHandler: RequestHandler,
  payload: DeleteUserPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: deleteUserEndpointSchema}),
    config
  );
}
