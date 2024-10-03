import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const updateUserEndpointSchema = {
  path: '/user/{username}',
  method: 'put',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    username: z.string(),
  }),
  bodyByContentType: {
    'application/json': {
      zodSchema: userZodSchema,
    },
    'application/xml': {
      zodSchema: userZodSchema,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: userZodSchema,
    },
  },
  responseByStatus: {
    default: {
      bodyByContentType: {},
    },
  },
};

export type UpdateUserRequest = RequestUnion<
  | RequestBodyData<'application/json', User>
  | RequestBodyData<'application/xml', User>
  | RequestBodyData<'application/x-www-form-urlencoded', User>,
  {
    username: string;
  }
>;

export type UpdateUserResponse = Response;

export type UpdateUserRequestResult = RequestResult<
  UpdateUserRequest,
  UpdateUserResponse
>;

export function updateUser(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    UpdateUserRequest,
    'pathParams' | 'contentType' | 'body'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UpdateUserRequestResult> {
  return requestHandler.execute(
    createRequest(updateUserEndpointSchema, payload),
    config
  );
}
