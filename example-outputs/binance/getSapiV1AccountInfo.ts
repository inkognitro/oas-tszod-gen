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

export const getSapiV1AccountInfoEndpointSchema = {
  path: '/sapi/v1/account/info',
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

export type GetSapiV1AccountInfoPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountInfoResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel: number; // int
          isMarginEnabled: boolean;
          isFutureEnabled: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountInfoRequestResult = RequestResult<
  Request,
  GetSapiV1AccountInfoResponse
>;

export function getSapiV1AccountInfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountInfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountInfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountInfoEndpointSchema,
    }),
    config
  );
}
