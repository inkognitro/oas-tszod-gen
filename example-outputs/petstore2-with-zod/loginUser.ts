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
} from '@example-outputs/petstore2-with-zod/core';

export const loginUserEndpointSchema = {
  path: '/user/login',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    username: z.string().optional(),
    password: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      headersZodSchema: z.object({
        'X-Rate-Limit': z.string().optional(),
        'X-Expires-After': z.string().datetime().optional(),
      }),
      bodyByContentType: {
        'application/xml': {
          zodSchema: z.string(),
        },
        'application/json': {
          zodSchema: z.string(),
        },
      },
    },
    '400': {
      bodyByContentType: {},
    },
  },
};

export type LoginUserRequest = RequestUnion<
  any,
  any,
  {
    username?: string;
    password?: string;
  }
>;

export type LoginUserResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', string>
      | ResponseBodyData<'application/json', string>,
      {
        'X-Rate-Limit'?: string;
        'X-Expires-After'?: string; // date-time
      }
    >
  | Response<400>;

export type LoginUserRequestResult = RequestResult<
  LoginUserRequest,
  LoginUserResponse
>;

export function loginUser(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<LoginUserRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<LoginUserRequestResult> {
  return requestHandler.execute(
    createRequest(loginUserEndpointSchema, payload),
    config
  );
}
