import {z_User, User} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

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
          zodSchema: z_User,
        },
        'application/json': {
          zodSchema: z_User,
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
  | Response<400>
  | Response<404>;

export type GetUserByNameRequestResult = RequestResult<
  GetUserByNameRequest,
  GetUserByNameResponse
>;

export function getUserByName(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUserByNameRequest, 'pathParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserByNameRequestResult> {
  return requestHandler.execute(
    createRequest(getUserByNameEndpointSchema, payload),
    config
  );
}
