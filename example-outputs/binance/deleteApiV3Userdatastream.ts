import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type DeleteApiV3UserdatastreamPayload = {
  queryParams: {
    listenKey?: string;
  };
};

export type DeleteApiV3UserdatastreamResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3UserdatastreamRequestResult = RequestResult<
  Request,
  DeleteApiV3UserdatastreamResponse
>;

export function deleteApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  payload: DeleteApiV3UserdatastreamPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteApiV3UserdatastreamEndpointSchema,
    }),
    config
  );
}
