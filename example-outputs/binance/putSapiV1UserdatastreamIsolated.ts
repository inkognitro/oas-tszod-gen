import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const putSapiV1UserdatastreamIsolatedEndpointSchema = {
  path: '/sapi/v1/userDataStream/isolated',
  method: 'put',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PutSapiV1UserdatastreamIsolatedPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type PutSapiV1UserdatastreamIsolatedResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', {}>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PutSapiV1UserdatastreamIsolatedRequestResult = RequestResult<
  Request,
  PutSapiV1UserdatastreamIsolatedResponse
>;

export function putSapiV1UserdatastreamIsolated(
  requestHandler: SimpleRequestHandler,
  payload: PutSapiV1UserdatastreamIsolatedPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PutSapiV1UserdatastreamIsolatedRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: putSapiV1UserdatastreamIsolatedEndpointSchema,
    }),
    config
  );
}
