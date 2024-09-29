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
        'X-Rate-Limit': z.number().int().safe().finite(),
        'X-Expires-After': z.string().datetime(), // date-time
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

export type LoginUserPayload = {
  queryParams: {
    username?: string;
    password?: string;
  };
};

export type LoginUserResponse =
  | Response<
      200,
      | ResponseBodyData<'application/xml', string>
      | ResponseBodyData<'application/json', string>,
      {
        'X-Rate-Limit': string;
        'X-Expires-After': string; // date-time
      }
    >
  | Response<400>;

export type LoginUserRequestResult = RequestResult<Request, LoginUserResponse>;

export function loginUser(
  requestHandler: SimpleRequestHandler,
  payload: LoginUserPayload,
  config?: RequestHandlerExecutionConfig
): Promise<LoginUserRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: loginUserEndpointSchema}),
    config
  );
}
