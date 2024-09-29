import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2-with-zod/core';

export const getUserByNameEndpointSchema = {
  path: '/user/{username}',
  method: 'get',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    username: z.string(),
  }),
  bodyByContentType: {},
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
    '400': {
      bodyByContentType: {},
    },
    '404': {
      bodyByContentType: {},
    },
  },
};

export type GetUserByNamePayload = {
  pathParams: {
    username: string;
  };
};

export type GetUserByNameResponse =
  | Response<
      200,
      | ResponseBodyData<'application/xml', User>
      | ResponseBodyData<'application/json', User>
    >
  | Response<400>
  | Response<404>;

export type GetUserByNameRequestResult = RequestResult<
  Request,
  GetUserByNameResponse
>;

export function getUserByName(
  requestHandler: SimpleRequestHandler,
  payload: GetUserByNamePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserByNameRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getUserByNameEndpointSchema}),
    config
  );
}
