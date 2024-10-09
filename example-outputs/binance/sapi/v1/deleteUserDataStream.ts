import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const deleteUserDataStreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'delete',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type DeleteUserDataStreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type DeleteUserDataStreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteUserDataStreamRequestResult = RequestResult<
  DeleteUserDataStreamRequest,
  DeleteUserDataStreamResponse
>;

export function deleteUserDataStream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteUserDataStreamRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteUserDataStreamRequestResult> {
  return requestHandler.execute(
    createRequest(deleteUserDataStreamEndpointSchema, payload),
    config
  );
}
