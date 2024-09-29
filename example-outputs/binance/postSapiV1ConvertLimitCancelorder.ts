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

export const postSapiV1ConvertLimitCancelorderEndpointSchema = {
  path: '/sapi/v1/convert/limit/cancelOrder',
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

export type PostSapiV1ConvertLimitCancelorderPayload = {
  queryParams: {
    orderId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1ConvertLimitCancelorderResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1ConvertLimitCancelorderRequestResult = RequestResult<
  Request,
  PostSapiV1ConvertLimitCancelorderResponse
>;

export function postSapiV1ConvertLimitCancelorder(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1ConvertLimitCancelorderPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1ConvertLimitCancelorderRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1ConvertLimitCancelorderEndpointSchema,
    }),
    config
  );
}
