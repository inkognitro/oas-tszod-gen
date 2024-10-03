import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
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

export type PostApiV3UserdatastreamRequest = Request;

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
  PostApiV3UserdatastreamRequest,
  PostApiV3UserdatastreamResponse
>;

export function postApiV3Userdatastream(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<PostApiV3UserdatastreamRequestResult> {
  return requestHandler.execute(
    createRequest(postApiV3UserdatastreamEndpointSchema),
    config
  );
}
