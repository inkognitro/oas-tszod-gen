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

export const deleteSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
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

export type DeleteSapiV1UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type DeleteSapiV1UserdatastreamResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1UserdatastreamRequestResult = RequestResult<
  Request,
  DeleteSapiV1UserdatastreamResponse
>;

export function deleteSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1UserdatastreamEndpointSchema,
    }),
    config
  );
}
