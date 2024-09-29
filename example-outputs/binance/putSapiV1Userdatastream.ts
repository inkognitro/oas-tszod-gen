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

export const putSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
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

export type PutSapiV1UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type PutSapiV1UserdatastreamResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type PutSapiV1UserdatastreamRequestResult = RequestResult<
  Request,
  PutSapiV1UserdatastreamResponse
>;

export function putSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: PutSapiV1UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PutSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: putSapiV1UserdatastreamEndpointSchema,
    }),
    config
  );
}
