import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1SubAccountStatusPayload = {
  queryParams: {
    email?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1SubAccountStatusResponse
>;

export function getSapiV1SubAccountStatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountStatusEndpointSchema,
    }),
    config
  );
}
