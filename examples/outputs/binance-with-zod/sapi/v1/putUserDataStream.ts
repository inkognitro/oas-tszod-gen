import {z_Error, Error} from '../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../core';

export const putUserDataStreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'put',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    listenKey: z.string().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({}),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
