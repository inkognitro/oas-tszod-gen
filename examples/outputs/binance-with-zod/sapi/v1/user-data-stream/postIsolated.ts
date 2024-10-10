import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '../../../core';

export const postIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            listenKey: z.string(),
          }),
        },
      },
    },
  },
};

export type PostIsolatedRequest = Request;

export type PostIsolatedResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostIsolatedRequestResult = RequestResult<
  PostIsolatedRequest,
  PostIsolatedResponse
>;

export function postIsolated(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(postIsolatedEndpointSchema),
    config
  );
}
