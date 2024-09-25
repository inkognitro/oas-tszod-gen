import {User} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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
  ResponseData<
    | ResponseBodyData<'application/json', User>
    | ResponseBodyData<'application/xml', User>
  >
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
