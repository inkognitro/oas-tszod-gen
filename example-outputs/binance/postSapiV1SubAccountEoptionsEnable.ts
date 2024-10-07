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

export type PostSapiV1SubAccountEoptionsEnableRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountEoptionsEnableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isEOptionsEnabled: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountEoptionsEnableRequestResult = RequestResult<
  PostSapiV1SubAccountEoptionsEnableRequest,
  PostSapiV1SubAccountEoptionsEnableResponse
>;

export function postSapiV1SubAccountEoptionsEnable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountEoptionsEnableRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountEoptionsEnableRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountEoptionsEnableEndpointSchema, payload),
    config
  );
}
