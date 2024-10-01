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

export const postSapiV1SimpleEarnFlexibleSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/subscribe',
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

export type PostSapiV1SimpleEarnFlexibleSubscribePayload = {
  queryParams: {
    productId: string;
    amount: number;
    autoSubscribe?: boolean;
    sourceAccount?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnFlexibleSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          purchaseId: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SimpleEarnFlexibleSubscribeRequestResult = RequestResult<
  Request,
  PostSapiV1SimpleEarnFlexibleSubscribeResponse
>;

export function postSapiV1SimpleEarnFlexibleSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnFlexibleSubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SimpleEarnFlexibleSubscribeEndpointSchema,
    }),
    config
  );
}
