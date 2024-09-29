import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type DeleteSapiV1UserdatastreamIsolatedPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type DeleteSapiV1UserdatastreamIsolatedResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1UserdatastreamIsolatedRequestResult = RequestResult<
  Request,
  DeleteSapiV1UserdatastreamIsolatedResponse
>;

export function deleteSapiV1UserdatastreamIsolated(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1UserdatastreamIsolatedPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1UserdatastreamIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1UserdatastreamIsolatedEndpointSchema,
    }),
    config
  );
}
