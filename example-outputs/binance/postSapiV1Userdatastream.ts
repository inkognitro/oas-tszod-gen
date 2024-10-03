import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1UserdatastreamEndpointSchema = {
  path: '/sapi/v1/userDataStream',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1UserdatastreamRequest = Request;

export type PostSapiV1UserdatastreamResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostSapiV1UserdatastreamRequestResult = RequestResult<
  PostSapiV1UserdatastreamRequest,
  PostSapiV1UserdatastreamResponse
>;

export function postSapiV1Userdatastream(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1UserdatastreamEndpointSchema),
    config
  );
}
