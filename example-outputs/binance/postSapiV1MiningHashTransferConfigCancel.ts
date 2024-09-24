import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1MiningHashTransferConfigCancelEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/cancel',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1MiningHashTransferConfigCancelPayload = {
  queryParams: {
    configId: string;
    userName: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MiningHashTransferConfigCancelResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            code: number; // int
            msg: string;
            data: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MiningHashTransferConfigCancelRequestResult =
  RequestResult<Request, PostSapiV1MiningHashTransferConfigCancelResponse>;

export function postSapiV1MiningHashTransferConfigCancel(
  requestHandler: RequestHandler,
  payload: PostSapiV1MiningHashTransferConfigCancelPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MiningHashTransferConfigCancelRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MiningHashTransferConfigCancelEndpointSchema,
    }),
    config
  );
}
