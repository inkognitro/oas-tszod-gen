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

export const getSapiV1SubAccountListEndpointSchema = {
  path: '/sapi/v1/sub-account/list',
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

export type GetSapiV1SubAccountListRequest = RequestUnion<
  any,
  any,
  {
    email?: string;
    isFreeze?: 'true' | 'false';
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SubAccountListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          subAccounts: {
            email: string;
            isFreeze: boolean;
            createTime: number; // int
            isManagedSubAccount: boolean;
            isAssetManagementSubAccount: boolean;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountListRequestResult = RequestResult<
  GetSapiV1SubAccountListRequest,
  GetSapiV1SubAccountListResponse
>;

export function getSapiV1SubAccountList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1SubAccountListRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SubAccountListEndpointSchema, payload),
    config
  );
}
