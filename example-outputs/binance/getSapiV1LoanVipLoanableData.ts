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

export const getSapiV1LoanVipLoanableDataEndpointSchema = {
  path: '/sapi/v1/loan/vip/loanable/data',
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

export type GetSapiV1LoanVipLoanableDataRequest = RequestUnion<
  any,
  any,
  {
    loanCoin?: string;
    vipLevel?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LoanVipLoanableDataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanCoin: string;
            _flexibleDailyInterestRate: string;
            _flexibleYearlyInterestRate: string;
            _30dDailyInterestRate: string;
            _30dYearlyInterestRate: string;
            _60dDailyInterestRate: string;
            _60dYearlyInterestRate: string;
            minLimit: string;
            maxLimit: string;
            vipLevel: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanVipLoanableDataRequestResult = RequestResult<
  GetSapiV1LoanVipLoanableDataRequest,
  GetSapiV1LoanVipLoanableDataResponse
>;

export function getSapiV1LoanVipLoanableData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LoanVipLoanableDataRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanVipLoanableDataRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanVipLoanableDataEndpointSchema, payload),
    config
  );
}
