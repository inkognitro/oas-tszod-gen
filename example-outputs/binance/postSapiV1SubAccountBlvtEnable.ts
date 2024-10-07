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

export const postSapiV1SubAccountBlvtEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/blvt/enable',
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

export type PostSapiV1SubAccountBlvtEnableRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    enableBlvt: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountBlvtEnableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          enableBlvt: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountBlvtEnableRequestResult = RequestResult<
  PostSapiV1SubAccountBlvtEnableRequest,
  PostSapiV1SubAccountBlvtEnableResponse
>;

export function postSapiV1SubAccountBlvtEnable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountBlvtEnableRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountBlvtEnableRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountBlvtEnableEndpointSchema, payload),
    config
  );
}
