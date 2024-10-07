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

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

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
  RequestResult<
    PostSapiV1SimpleEarnFlexibleSetautosubscribeRequest,
    PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse
  >;

export function postSapiV1SimpleEarnFlexibleSetautosubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SimpleEarnFlexibleSetautosubscribeRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema,
      payload
    ),
    config
  );
}
