import {userZodSchema, User} from '@example-outputs/petstore2-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
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
      ResponseData<
        | ResponseBodyData<'application/xml', User>
        | ResponseBodyData<'application/json', User>
      >
    >
  | Response<400, any>
  | Response<404, any>;

export type GetUserByNameRequestResult = RequestResult<
  Request,
  GetUserByNameResponse
>;

export function getUserByName(
  requestHandler: RequestHandler,
  payload: GetUserByNamePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserByNameRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getUserByNameEndpointSchema}),
    config
  );
}
