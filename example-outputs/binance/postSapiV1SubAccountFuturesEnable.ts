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

export const postSapiV1SubAccountFuturesEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/enable',
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

export type PostSapiV1SubAccountFuturesEnableRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountFuturesEnableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isFuturesEnabled: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountFuturesEnableRequestResult = RequestResult<
  PostSapiV1SubAccountFuturesEnableRequest,
  PostSapiV1SubAccountFuturesEnableResponse
>;

export function postSapiV1SubAccountFuturesEnable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountFuturesEnableRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesEnableRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountFuturesEnableEndpointSchema, payload),
    config
  );
}
