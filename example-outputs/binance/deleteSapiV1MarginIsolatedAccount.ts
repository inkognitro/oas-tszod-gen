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

export const deleteSapiV1MarginIsolatedAccountEndpointSchema = {
  path: '/sapi/v1/margin/isolated/account',
  method: 'delete',
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

export type DeleteSapiV1MarginIsolatedAccountPayload = {
  queryParams: {
    symbol: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1MarginIsolatedAccountResponse =
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

export type DeleteSapiV1MarginIsolatedAccountRequestResult = RequestResult<
  Request,
  DeleteSapiV1MarginIsolatedAccountResponse
>;

export function deleteSapiV1MarginIsolatedAccount(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1MarginIsolatedAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginIsolatedAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteSapiV1MarginIsolatedAccountEndpointSchema,
    }),
    config
  );
}
