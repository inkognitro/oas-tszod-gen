import {z_User, User} from './schemas';
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
} from './core';

export const createUserEndpointSchema = {
  path: '/user',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {
      zodSchema: z_User,
    },
    'application/xml': {
      zodSchema: z_User,
    },
    'application/x-www-form-urlencoded': {
      zodSchema: z_User,
    },
  },
  responseByStatus: {
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_User,
        },
        'application/xml': {
          zodSchema: z_User,
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
  payload: RequestPayload<CreateUserRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUserRequestResult> {
  return requestHandler.execute(
    createRequest(createUserEndpointSchema, payload),
    config
  );
}
