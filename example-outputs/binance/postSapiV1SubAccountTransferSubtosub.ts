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

export const postSapiV1SubAccountTransferSubtosubEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subToSub',
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

export type PostSapiV1SubAccountTransferSubtosubPayload = {
  queryParams: {
    toEmail: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountTransferSubtosubResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          txnId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountTransferSubtosubRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountTransferSubtosubResponse
>;

export function postSapiV1SubAccountTransferSubtosub(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountTransferSubtosubPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountTransferSubtosubRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountTransferSubtosubEndpointSchema,
    }),
    config
  );
}
