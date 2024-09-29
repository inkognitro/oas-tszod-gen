import {
  SubAccountUSDTFuturesSummary,
  SubAccountCOINFuturesSummary,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV2SubAccountFuturesAccountsummaryEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/accountSummary',
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

export type GetSapiV2SubAccountFuturesAccountsummaryPayload = {
  queryParams: {
    futuresType: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesAccountsummaryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesSummary | SubAccountCOINFuturesSummary
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesAccountsummaryRequestResult =
  RequestResult<Request, GetSapiV2SubAccountFuturesAccountsummaryResponse>;

export function getSapiV2SubAccountFuturesAccountsummary(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesAccountsummaryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountsummaryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesAccountsummaryEndpointSchema,
    }),
    config
  );
}
