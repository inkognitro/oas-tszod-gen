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

export type PostSapiV1MiningHashTransferConfigPayload = {
  queryParams: {
    userName: string;
    algo: string;
    startDate?: string;
    endDate?: string;
    toPoolUser: string;
    hashRate: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MiningHashTransferConfigResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1MiningHashTransferConfigRequestResult = RequestResult<
  Request,
  PostSapiV1MiningHashTransferConfigResponse
>;

export function postSapiV1MiningHashTransferConfig(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MiningHashTransferConfigPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MiningHashTransferConfigEndpointSchema,
    }),
    config
  );
}
