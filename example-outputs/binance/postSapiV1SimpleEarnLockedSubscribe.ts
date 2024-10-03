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

export const postSapiV1SimpleEarnLockedSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/subscribe',
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

export type PostSapiV1SimpleEarnLockedSubscribeRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    amount: number;
    autoSubscribe?: boolean;
    sourceAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SimpleEarnLockedSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: number; // int
          positionId: string;
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnLockedSubscribeRequestResult = RequestResult<
  PostSapiV1SimpleEarnLockedSubscribeRequest,
  PostSapiV1SimpleEarnLockedSubscribeResponse
>;

export function postSapiV1SimpleEarnLockedSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnLockedSubscribeRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SimpleEarnLockedSubscribeEndpointSchema, payload),
    config
  );
}
