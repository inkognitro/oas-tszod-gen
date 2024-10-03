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

export const putSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
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

export type PutSapiV1UserdatastreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutSapiV1UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutSapiV1UserdatastreamRequestResult = RequestResult<
  PutSapiV1UserdatastreamRequest,
  PutSapiV1UserdatastreamResponse
>;

export function putSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PutSapiV1UserdatastreamRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PutSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(putSapiV1UserdatastreamEndpointSchema, payload),
    config
  );
}
