import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV1SubAccountMarginEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/enable',
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

export type PostSapiV1SubAccountMarginEnablePayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountMarginEnableResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            email: string;
            isMarginEnabled: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SubAccountMarginEnableRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountMarginEnableResponse
>;

export function postSapiV1SubAccountMarginEnable(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountMarginEnablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountMarginEnableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountMarginEnableEndpointSchema,
    }),
    config
  );
}
