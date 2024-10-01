import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postApiV3UserdatastreamEndpointSchema = {
  path: '/api/v3/userDataStream',
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

export type PostApiV3UserdatastreamResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      listenKey: string;
    }
  >
>;

export type PostApiV3UserdatastreamRequestResult = RequestResult<
  Request,
  PostApiV3UserdatastreamResponse
>;

export function postApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: postApiV3UserdatastreamEndpointSchema}),
    config
  );
}
