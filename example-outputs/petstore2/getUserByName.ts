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
} from '@example-outputs/petstore2/core';
import {User} from '@example-outputs/petstore2';

export const getUserByNameEndpointSchema = {
  path: '/user/{username}',
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
  payload: RequestPayload<GetUserByNameRequest, 'pathParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUserByNameRequestResult> {
  return requestHandler.execute(
    createRequest(getUserByNameEndpointSchema, payload),
    config
  );
}
