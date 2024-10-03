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

export const postSapiV1SubAccountTransferSubtomasterEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subToMaster',
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

export type PostSapiV1SubAccountTransferSubtomasterRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountTransferSubtomasterResponse =
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

export type PostSapiV1SubAccountTransferSubtomasterRequestResult =
  RequestResult<
    PostSapiV1SubAccountTransferSubtomasterRequest,
    PostSapiV1SubAccountTransferSubtomasterResponse
  >;

export function postSapiV1SubAccountTransferSubtomaster(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountTransferSubtomasterRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountTransferSubtomasterRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1SubAccountTransferSubtomasterEndpointSchema,
      payload
    ),
    config
  );
}
