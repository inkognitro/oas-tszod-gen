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

export type PostSapiV1SubAccountFuturesEnablePayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountFuturesEnableResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isFuturesEnabled: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountFuturesEnableRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountFuturesEnableResponse
>;

export function postSapiV1SubAccountFuturesEnable(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountFuturesEnablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesEnableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountFuturesEnableEndpointSchema,
    }),
    config
  );
}
