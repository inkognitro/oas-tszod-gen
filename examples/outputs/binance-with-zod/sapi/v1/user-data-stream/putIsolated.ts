import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const putIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
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

export type PutIsolatedRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutIsolatedResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutIsolatedRequestResult = RequestResult<
  PutIsolatedRequest,
  PutIsolatedResponse
>;

export function putIsolated(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PutIsolatedRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PutIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(putIsolatedEndpointSchema, payload),
    config
  );
}
