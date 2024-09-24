import {User} from '@example-outputs/petstore2';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
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
