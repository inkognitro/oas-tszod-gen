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

export const postSapiV1MiningHashTransferConfigCancelEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/cancel',
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

export type PostSapiV1MiningHashTransferConfigCancelRequest = RequestUnion<
  any,
  any,
  {
    configId: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1MiningHashTransferConfigCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MiningHashTransferConfigCancelRequestResult =
  RequestResult<
    PostSapiV1MiningHashTransferConfigCancelRequest,
    PostSapiV1MiningHashTransferConfigCancelResponse
  >;

export function postSapiV1MiningHashTransferConfigCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1MiningHashTransferConfigCancelRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigCancelRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1MiningHashTransferConfigCancelEndpointSchema,
      payload
    ),
    config
  );
}
