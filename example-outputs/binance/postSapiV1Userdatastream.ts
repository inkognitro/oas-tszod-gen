import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1UserdatastreamResponse = Response<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostSapiV1UserdatastreamRequestResult = RequestResult<
  Request,
  PostSapiV1UserdatastreamResponse
>;

export function postSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: postSapiV1UserdatastreamEndpointSchema}),
    config
  );
}
