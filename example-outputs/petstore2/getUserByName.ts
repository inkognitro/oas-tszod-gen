import {User} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

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

export type GetUserByNamePayload = {
  pathParams: {
    username: string;
  };
};

export type GetUserByNameResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', User>
      | ResponseBodyData<'application/json', User>
    >
  | ResponseUnion<400>
  | ResponseUnion<404>;

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
