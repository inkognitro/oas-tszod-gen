import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../core';

export const postUserDataStreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostUserDataStreamRequest = Request;

export type PostUserDataStreamResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostUserDataStreamRequestResult = RequestResult<
  PostUserDataStreamRequest,
  PostUserDataStreamResponse
>;

export function postUserDataStream(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostUserDataStreamRequestResult> {
  return requestHandler.execute(
    createRequest(postUserDataStreamEndpointSchema),
    config
  );
}
