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

export const postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/setAutoSubscribe',
  method: 'post',
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
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type PostSapiV1SimpleEarnLockedSetautosubscribePayload = {
  queryParams: {
    positionId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnLockedSetautosubscribeResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult =
  RequestResult<Request, PostSapiV1SimpleEarnLockedSetautosubscribeResponse>;

export function postSapiV1SimpleEarnLockedSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnLockedSetautosubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema,
    }),
    config
  );
}
