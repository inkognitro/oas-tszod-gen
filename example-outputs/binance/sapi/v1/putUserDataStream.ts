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

export const putUserDataStreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'put',
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

export type PutUserDataStreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutUserDataStreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutUserDataStreamRequestResult = RequestResult<
  PutUserDataStreamRequest,
  PutUserDataStreamResponse
>;

export function putUserDataStream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PutUserDataStreamRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PutUserDataStreamRequestResult> {
  return requestHandler.execute(
    createRequest(putUserDataStreamEndpointSchema, payload),
    config
  );
}
