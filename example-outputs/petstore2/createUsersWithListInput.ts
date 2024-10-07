import {User} from '@example-outputs/petstore2';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
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

export type CreateUsersWithListInputRequest = RequestUnion<
  RequestBodyData<'application/json', User[]>
>;

export type CreateUsersWithListInputResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', User>
      | ResponseBodyData<'application/json', User>
    >
  | Response;

export type CreateUsersWithListInputRequestResult = RequestResult<
  CreateUsersWithListInputRequest,
  CreateUsersWithListInputResponse
>;

export function createUsersWithListInput(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    CreateUsersWithListInputRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<CreateUsersWithListInputRequestResult> {
  return requestHandler.execute(
    createRequest(createUsersWithListInputEndpointSchema, payload),
    config
  );
}
