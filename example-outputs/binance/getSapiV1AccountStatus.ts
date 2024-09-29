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

export const getSapiV1AccountStatusEndpointSchema = {
  path: '/sapi/v1/account/status',
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

export type GetSapiV1AccountStatusPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountStatusRequestResult = RequestResult<
  Request,
  GetSapiV1AccountStatusResponse
>;

export function getSapiV1AccountStatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountStatusEndpointSchema,
    }),
    config
  );
}
