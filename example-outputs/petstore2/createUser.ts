import {User} from '@example-outputs/petstore2';
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
} from '@example-outputs/petstore2/core';

export const createUserEndpointSchema = {
  path: '/user',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
    'application/xml': {},
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    default: {
      bodyByContentType: {
        'application/json': {},
        'application/xml': {},
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
