import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type UpdateUserResponse = Response<any, any>;

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
