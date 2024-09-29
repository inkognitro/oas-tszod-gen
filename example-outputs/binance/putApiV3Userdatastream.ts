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

export const putApiV3UserdatastreamEndpointSchema = {
  path: '/api/v3/userDataStream',
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

export type PutApiV3UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type PutApiV3UserdatastreamResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type PutApiV3UserdatastreamRequestResult = RequestResult<
  Request,
  PutApiV3UserdatastreamResponse
>;

export function putApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: PutApiV3UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PutApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: putApiV3UserdatastreamEndpointSchema,
    }),
    config
  );
}
