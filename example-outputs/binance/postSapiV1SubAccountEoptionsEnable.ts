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

export const postSapiV1SubAccountEoptionsEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/eoptions/enable',
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

export type PostSapiV1SubAccountEoptionsEnablePayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountEoptionsEnableResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isEOptionsEnabled: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountEoptionsEnableRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountEoptionsEnableResponse
>;

export function postSapiV1SubAccountEoptionsEnable(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountEoptionsEnablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountEoptionsEnableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountEoptionsEnableEndpointSchema,
    }),
    config
  );
}
