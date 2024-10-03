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

export const postSapiV1MiningHashTransferConfigEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config',
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

export type PostSapiV1MiningHashTransferConfigRequest = RequestUnion<
  any,
  any,
  {
    userName: string;
    algo: string;
    startDate?: string;
    endDate?: string;
    toPoolUser: string;
    hashRate: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1MiningHashTransferConfigResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MiningHashTransferConfigRequestResult = RequestResult<
  PostSapiV1MiningHashTransferConfigRequest,
  PostSapiV1MiningHashTransferConfigResponse
>;

export function postSapiV1MiningHashTransferConfig(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1MiningHashTransferConfigRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1MiningHashTransferConfigEndpointSchema, payload),
    config
  );
}
