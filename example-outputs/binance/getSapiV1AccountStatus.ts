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

export type GetSapiV1AccountStatusRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1AccountStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountStatusRequestResult = RequestResult<
  GetSapiV1AccountStatusRequest,
  GetSapiV1AccountStatusResponse
>;

export function getSapiV1AccountStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1AccountStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1AccountStatusEndpointSchema, payload),
    config
  );
}
