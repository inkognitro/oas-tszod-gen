import {User} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const updateUserEndpointSchema = {
  path: '/user/{username}',
  method: 'put',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
    'application/xml': {},
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    default: {
      bodyByContentType: {},
    },
  },
};

export type UpdateUserRequestBody =
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

export type UpdateUserPayload = UpdateUserRequestBody & {
  pathParams: {
    username: string;
  };
};

export type UpdateUserResponse = Response;

export type UpdateUserRequestResult = RequestResult<
  Request,
  UpdateUserResponse
>;

export function updateUser(
  requestHandler: SimpleRequestHandler,
  payload: UpdateUserPayload,
  config?: RequestHandlerExecutionConfig
): Promise<UpdateUserRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: updateUserEndpointSchema}),
    config
  );
}
