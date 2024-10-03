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

export const deleteSapiV1UserdatastreamIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
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

export type DeleteSapiV1UserdatastreamIsolatedRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type DeleteSapiV1UserdatastreamIsolatedResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1UserdatastreamIsolatedRequestResult = RequestResult<
  DeleteSapiV1UserdatastreamIsolatedRequest,
  DeleteSapiV1UserdatastreamIsolatedResponse
>;

export function deleteSapiV1UserdatastreamIsolated(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSapiV1UserdatastreamIsolatedRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1UserdatastreamIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1UserdatastreamIsolatedEndpointSchema, payload),
    config
  );
}
