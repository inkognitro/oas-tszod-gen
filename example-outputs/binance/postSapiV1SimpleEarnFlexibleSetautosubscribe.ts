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

export const postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/setAutoSubscribe',
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

export type PostSapiV1SimpleEarnFlexibleSetautosubscribePayload = {
  queryParams: {
    productId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse =
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

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult =
  RequestResult<Request, PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse>;

export function postSapiV1SimpleEarnFlexibleSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SimpleEarnFlexibleSetautosubscribePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema,
    }),
    config
  );
}
