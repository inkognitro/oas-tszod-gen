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

export const getSapiV1SubAccountMarginAccountsummaryEndpointSchema = {
  path: '/sapi/v1/sub-account/margin/accountSummary',
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

export type GetSapiV1SubAccountMarginAccountsummaryRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SubAccountMarginAccountsummaryResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountMarginAccountsummaryRequestResult =
  RequestResult<
    GetSapiV1SubAccountMarginAccountsummaryRequest,
    GetSapiV1SubAccountMarginAccountsummaryResponse
  >;

export function getSapiV1SubAccountMarginAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SubAccountMarginAccountsummaryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountMarginAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SubAccountMarginAccountsummaryEndpointSchema,
      payload
    ),
    config
  );
}
