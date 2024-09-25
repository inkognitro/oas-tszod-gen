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

export const postSapiV1MarginIsolatedAccountEndpointSchema = {
  path: '/sapi/v1/margin/isolated/account',
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

export type PostSapiV1MarginIsolatedAccountPayload = {
  queryParams: {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1MarginIsolatedAccountResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            success: boolean;
            symbol: string;
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV1MarginIsolatedAccountRequestResult = RequestResult<
  Request,
  PostSapiV1MarginIsolatedAccountResponse
>;

export function postSapiV1MarginIsolatedAccount(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1MarginIsolatedAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1MarginIsolatedAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1MarginIsolatedAccountEndpointSchema,
    }),
    config
  );
}
