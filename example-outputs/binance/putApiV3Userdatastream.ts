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

export type PutApiV3UserdatastreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type PutApiV3UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type PutApiV3UserdatastreamRequestResult = RequestResult<
  PutApiV3UserdatastreamRequest,
  PutApiV3UserdatastreamResponse
>;

export function putApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PutApiV3UserdatastreamRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<PutApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(putApiV3UserdatastreamEndpointSchema, payload),
    config
  );
}
