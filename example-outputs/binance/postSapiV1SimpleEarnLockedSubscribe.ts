import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1SimpleEarnLockedSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/subscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1SimpleEarnLockedSubscribePayload = {
  queryParams: {
    projectId: string;
    amount: number;
    autoSubscribe?: boolean;
    sourceAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnLockedSubscribeResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            purchaseId: number; // int
            positionId: string;
            success: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SimpleEarnLockedSubscribeRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnLockedSubscribeResponse
>;

export function postSapiV1SimpleEarnLockedSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnLockedSubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnLockedSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnLockedSubscribeEndpointSchema,
    }),
    config
  );
}
