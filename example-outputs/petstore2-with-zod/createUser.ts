import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/petstore2-with-zod/core';

export const createUserEndpointSchema = {
  path: '/user',
  method: 'post',
  supportedSecuritySchemas: [],
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
      bodyByContentType: {
        'application/json': {
          zodSchema: userZodSchema,
        },
        'application/xml': {
          zodSchema: userZodSchema,
        },
      },
    },
  },
};

export type CreateUserRequest = RequestUnion<
  | RequestBodyData<'application/json', User>
  | RequestBodyData<'application/xml', User>
  | RequestBodyData<'application/x-www-form-urlencoded', User>
>;

export type CreateUserResponse = ResponseUnion<
  any,
  | ResponseBodyData<'application/json', User>
  | ResponseBodyData<'application/xml', User>
>;

export type CreateUserRequestResult = RequestResult<
  CreateUserRequest,
  CreateUserResponse
>;

export function createUser(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<CreateUserRequest, 'contentType' | 'body'>,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUserRequestResult> {
  return requestHandler.execute(
    createRequest(createUserEndpointSchema, payload),
    config
  );
}
