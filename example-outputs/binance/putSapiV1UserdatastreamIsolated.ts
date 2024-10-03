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

export const putSapiV1UserdatastreamIsolatedEndpointSchema = {
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

export type PutSapiV1UserdatastreamIsolatedRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutSapiV1UserdatastreamIsolatedResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutSapiV1UserdatastreamIsolatedRequestResult = RequestResult<
  PutSapiV1UserdatastreamIsolatedRequest,
  PutSapiV1UserdatastreamIsolatedResponse
>;

export function putSapiV1UserdatastreamIsolated(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PutSapiV1UserdatastreamIsolatedRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PutSapiV1UserdatastreamIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(putSapiV1UserdatastreamIsolatedEndpointSchema, payload),
    config
  );
}
