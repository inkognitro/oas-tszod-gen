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

export const createUsersWithListInputEndpointSchema = {
  path: '/user/createWithList',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {
      zodSchema: z.array(userZodSchema),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {
          zodSchema: userZodSchema,
        },
        'application/json': {
          zodSchema: userZodSchema,
        },
      },
    },
    default: {
      bodyByContentType: {},
    },
  },
};

export type CreateUsersWithListInputRequestBody = {
  contentType: 'application/json';
  body: User[];
};

export type CreateUsersWithListInputPayload =
  CreateUsersWithListInputRequestBody;

export type CreateUsersWithListInputResponse =
  | Response<
      200,
      ResponseData<
        | ResponseBodyData<'application/xml', User>
        | ResponseBodyData<'application/json', User>
      >
    >
  | Response<any, any>;

export type CreateUsersWithListInputRequestResult = RequestResult<
  Request,
  CreateUsersWithListInputResponse
>;

export function createUsersWithListInput(
  requestHandler: SimpleRequestHandler,
  payload: CreateUsersWithListInputPayload,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUsersWithListInputRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: createUsersWithListInputEndpointSchema,
    }),
    config
  );
}
