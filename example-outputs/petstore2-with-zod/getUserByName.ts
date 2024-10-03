import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
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

export type GetUserByNameRequest = RequestUnion<
  any,
  {
    username: string;
  }
>;

export type GetUserByNameResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', User>
      | ResponseBodyData<'application/json', User>
    >
  | ResponseUnion<400>
  | ResponseUnion<404>;

export type GetUserByNameRequestResult = RequestResult<
  GetUserByNameRequest,
  GetUserByNameResponse
>;

export function getUserByName(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUserByNameRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserByNameRequestResult> {
  return requestHandler.execute(
    createRequest(getUserByNameEndpointSchema, payload),
    config
  );
}
