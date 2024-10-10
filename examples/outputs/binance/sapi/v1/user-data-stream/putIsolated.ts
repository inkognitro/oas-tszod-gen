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
import {Error} from '../../../';

export const putIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
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
