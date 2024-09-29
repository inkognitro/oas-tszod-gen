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

export const getSapiV1ManagedSubaccountInfoEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/info',
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

export type GetSapiV1ManagedSubaccountInfoPayload = {
  queryParams: {
    email: string;
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountInfoResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          managerSubUserInfoVoList: {
            rootUserId: number; // int
            managersubUserId: number; // int
            bindParentUserId: number; // int
            email?: string;
            insertTimeStamp: number; // int
            bindParentEmail: string;
            isSubUserEnabled: boolean;
            isUserActive: boolean;
            isMarginEnabled: boolean;
            isFutureEnabled: boolean;
            isSignedLVTRiskAgreement: boolean;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountInfoRequestResult = RequestResult<
  Request,
  GetSapiV1ManagedSubaccountInfoResponse
>;

export function getSapiV1ManagedSubaccountInfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountInfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountInfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountInfoEndpointSchema,
    }),
    config
  );
}
