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

export const getSapiV1SubAccountMarginAccountsummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/accountSummary',
  method: 'get',
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

export type GetSapiV1SubAccountMarginAccountsummaryPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountMarginAccountsummaryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            totalAssetOfBtc: string;
            totalLiabilityOfBtc: string;
            totalNetAssetOfBtc: string;
            subAccountList: {
              email: string;
              totalAssetOfBtc: string;
              totalLiabilityOfBtc: string;
              totalNetAssetOfBtc: string;
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountMarginAccountsummaryRequestResult =
  RequestResult<Request, GetSapiV1SubAccountMarginAccountsummaryResponse>;

export function getSapiV1SubAccountMarginAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountMarginAccountsummaryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountMarginAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountMarginAccountsummaryEndpointSchema,
    }),
    config
  );
}
