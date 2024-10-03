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

export const postSapiV1SubAccountVirtualsubaccountEndpointSchema = {
  path: '/sapi/v1/sub-account/virtualSubAccount',
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

export type PostSapiV1SubAccountVirtualsubaccountRequest = RequestUnion<
  any,
  any,
  {
    subAccountString: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountVirtualsubaccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountVirtualsubaccountRequestResult = RequestResult<
  PostSapiV1SubAccountVirtualsubaccountRequest,
  PostSapiV1SubAccountVirtualsubaccountResponse
>;

export function postSapiV1SubAccountVirtualsubaccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountVirtualsubaccountRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountVirtualsubaccountRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountVirtualsubaccountEndpointSchema, payload),
    config
  );
}
