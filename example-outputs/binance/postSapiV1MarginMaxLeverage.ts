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

export const postSapiV1MarginMaxLeverageEndpointSchema = {
  path: '/sapi/v1/margin/max-leverage',
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

export type PostSapiV1MarginMaxLeveragePayload = {
  queryParams: {
    maxLeverage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginMaxLeverageResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            success: boolean;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MarginMaxLeverageRequestResult = RequestResult<
  Request,
  PostSapiV1MarginMaxLeverageResponse
>;

export function postSapiV1MarginMaxLeverage(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginMaxLeveragePayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginMaxLeverageRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginMaxLeverageEndpointSchema,
    }),
    config
  );
}
