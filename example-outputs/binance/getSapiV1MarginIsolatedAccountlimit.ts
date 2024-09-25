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

export const getSapiV1MarginIsolatedAccountlimitEndpointSchema = {
  path: '/sapi/v1/margin/isolated/accountLimit',
  method: 'get',
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

export type GetSapiV1MarginIsolatedAccountlimitPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedAccountlimitResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            enabledAccount: number; // int
            maxAccount: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginIsolatedAccountlimitRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedAccountlimitResponse
>;

export function getSapiV1MarginIsolatedAccountlimit(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedAccountlimitPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAccountlimitRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedAccountlimitEndpointSchema,
    }),
    config
  );
}
