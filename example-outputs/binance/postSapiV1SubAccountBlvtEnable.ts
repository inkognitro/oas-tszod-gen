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

export const postSapiV1SubAccountBlvtEnableEndpointSchema = {
  path: '/sapi/v1/sub-account/blvt/enable',
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

export type PostSapiV1SubAccountBlvtEnablePayload = {
  queryParams: {
    email: string;
    enableBlvt: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountBlvtEnableResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            email: string;
            enableBlvt: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1SubAccountBlvtEnableRequestResult = RequestResult<
  Request,
  PostSapiV1SubAccountBlvtEnableResponse
>;

export function postSapiV1SubAccountBlvtEnable(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountBlvtEnablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountBlvtEnableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountBlvtEnableEndpointSchema,
    }),
    config
  );
}
