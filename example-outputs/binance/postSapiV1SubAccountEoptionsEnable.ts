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

export const postSapiV1SubAccountEoptionsEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/eoptions/enable',
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

export type PostSapiV1SubAccountEoptionsEnablePayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountEoptionsEnableResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            email: string;
            isEOptionsEnabled: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SubAccountEoptionsEnableRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountEoptionsEnableResponse
>;

export function postSapiV1SubAccountEoptionsEnable(
  requestHandler: RequestHandler,
  payload: PostSapiV1SubAccountEoptionsEnablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountEoptionsEnableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountEoptionsEnableEndpointSchema,
    }),
    config
  );
}
