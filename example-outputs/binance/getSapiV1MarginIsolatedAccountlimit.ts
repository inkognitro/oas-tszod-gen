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

export const getSapiV1MarginIsolatedAccountlimitEndpointSchema = {
  path: '/sapi/v1/margin/isolated/accountLimit',
  method: 'get',
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

export type GetSapiV1MarginIsolatedAccountlimitRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedAccountlimitResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          enabledAccount: number; // int
          maxAccount: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedAccountlimitRequestResult = RequestResult<
  GetSapiV1MarginIsolatedAccountlimitRequest,
  GetSapiV1MarginIsolatedAccountlimitResponse
>;

export function getSapiV1MarginIsolatedAccountlimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginIsolatedAccountlimitRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedAccountlimitRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedAccountlimitEndpointSchema, payload),
    config
  );
}
