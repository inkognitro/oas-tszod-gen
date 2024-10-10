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

export const deleteIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
  method: 'delete',
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

export type DeleteIsolatedRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type DeleteIsolatedResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteIsolatedRequestResult = RequestResult<
  DeleteIsolatedRequest,
  DeleteIsolatedResponse
>;

export function deleteIsolated(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteIsolatedRequest, never, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(deleteIsolatedEndpointSchema, payload),
    config
  );
}
