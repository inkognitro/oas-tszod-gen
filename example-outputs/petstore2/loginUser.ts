import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const loginUserEndpointSchema = {
  path: '/user/login',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
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
      ResponseData<
        | ResponseBodyData<'application/xml', string>
        | ResponseBodyData<'application/json', string>,
        {
          'X-Rate-Limit': string;
          'X-Expires-After': string; // date-time
        }
      >
    >
  | Response<400, any>;

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
