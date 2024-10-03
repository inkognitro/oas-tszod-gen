import {z} from 'zod';
import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1UserdatastreamIsolatedEndpointSchema = {
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

export type PostSapiV1UserdatastreamIsolatedRequest = Request;

export type PostSapiV1UserdatastreamIsolatedResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostSapiV1UserdatastreamIsolatedRequestResult = RequestResult<
  PostSapiV1UserdatastreamIsolatedRequest,
  PostSapiV1UserdatastreamIsolatedResponse
>;

export function postSapiV1UserdatastreamIsolated(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1UserdatastreamIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1UserdatastreamIsolatedEndpointSchema),
    config
  );
}
