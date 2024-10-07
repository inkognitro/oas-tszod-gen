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

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequest = RequestUnion<
  any,
  any,
  {
    positionId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnLockedSetautosubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult =
  RequestResult<
    PostSapiV1SimpleEarnLockedSetautosubscribeRequest,
    PostSapiV1SimpleEarnLockedSetautosubscribeResponse
  >;

export function postSapiV1SimpleEarnLockedSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnLockedSetautosubscribeRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema,
      payload
    ),
    config
  );
}
