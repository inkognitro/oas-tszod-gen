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

export type PostSapiV1SubAccountVirtualsubaccountPayload = {
  queryParams: {
    subAccountString: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  PostSapiV1SubAccountVirtualsubaccountResponse
>;

export function postSapiV1SubAccountVirtualsubaccount(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountVirtualsubaccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountVirtualsubaccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountVirtualsubaccountEndpointSchema,
    }),
    config
  );
}
