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

export const getSapiV1SubAccountStatusEndpointSchema = {
  path: '/sapi/v1/sub-account/status',
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

export type GetSapiV1SubAccountStatusRequest = RequestUnion<
  any,
  any,
  {
    email?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SubAccountStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isSubUserEnabled: boolean;
          isUserActive: boolean;
          insertTime: number; // int
          isMarginEnabled: boolean;
          isFutureEnabled: boolean;
          mobile: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountStatusRequestResult = RequestResult<
  GetSapiV1SubAccountStatusRequest,
  GetSapiV1SubAccountStatusResponse
>;

export function getSapiV1SubAccountStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1SubAccountStatusRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SubAccountStatusEndpointSchema, payload),
    config
  );
}
