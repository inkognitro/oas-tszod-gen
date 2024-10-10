import {z_User, User} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const updateUserEndpointSchema = {
  path: '/user/{username}',
  method: 'put',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    username: z.string(),
  }),
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
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UpdateUserRequestResult> {
  return requestHandler.execute(
    createRequest(updateUserEndpointSchema, payload),
    config
  );
}
