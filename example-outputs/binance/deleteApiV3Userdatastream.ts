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

export const deleteApiV3UserdatastreamEndpointSchema = {
  path: '/api/v3/userDataStream',
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

export type DeleteApiV3UserdatastreamRequest = RequestUnion<
  any,
  any,
  {
    listenKey?: string;
  }
>;

export type DeleteApiV3UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3UserdatastreamRequestResult = RequestResult<
  DeleteApiV3UserdatastreamRequest,
  DeleteApiV3UserdatastreamResponse
>;

export function deleteApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteApiV3UserdatastreamRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApiV3UserdatastreamEndpointSchema, payload),
    config
  );
}
