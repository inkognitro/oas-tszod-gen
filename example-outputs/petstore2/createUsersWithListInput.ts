import {User} from '@example-outputs/petstore2';
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

export const createUsersWithListInputEndpointSchema = {
  path: '/user/createWithList',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/json': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {},
    },
  },
};

export type CreateUsersWithListInputRequestBody = {
  contentType: 'application/json';
  body: User[];
};

export type CreateUsersWithListInputPayload =
  CreateUsersWithListInputRequestBody;

export type CreateUsersWithListInputResponse =
  | Response<
      200,
      ResponseData<
        | ResponseBodyData<'application/xml', User>
        | ResponseBodyData<'application/json', User>
      >
    >
  | Response<any, any>;

export type CreateUsersWithListInputRequestResult = RequestResult<
  Request,
  CreateUsersWithListInputResponse
>;

export function createUsersWithListInput(
  requestHandler: SimpleRequestHandler,
  payload: CreateUsersWithListInputPayload,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUsersWithListInputRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: createUsersWithListInputEndpointSchema,
    }),
    config
  );
}
