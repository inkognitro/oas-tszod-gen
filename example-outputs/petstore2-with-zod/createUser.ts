import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type CreateUserRequestBody =
  | {
      contentType: 'application/json';
      body: User;
    }
  | {
      contentType: 'application/xml';
      body: User;
    }
  | {
      contentType: 'application/x-www-form-urlencoded';
      body: User;
    };

export type CreateUserPayload = CreateUserRequestBody;

export type CreateUserResponse = Response<
  any,
  | ResponseBodyData<'application/json', User>
  | ResponseBodyData<'application/xml', User>
>;

export type CreateUserRequestResult = RequestResult<
  Request,
  CreateUserResponse
>;

export function createUser(
  requestHandler: SimpleRequestHandler,
  payload: CreateUserPayload,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUserRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: createUserEndpointSchema}),
    config
  );
}
