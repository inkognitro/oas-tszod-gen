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

export const getSapiV1LoanLoanableDataEndpointSchema = {
  path: '/sapi/v1/loan/loanable/data',
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

export type GetSapiV1LoanLoanableDataPayload = {
  queryParams: {
    loanCoin?: string;
    vipLevel?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LoanLoanableDataResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            _7dHourlyInterestRate: string;
            _7dDailyInterestRate: string;
            _14dHourlyInterestRate: string;
            _14dDailyInterestRate: string;
            _30dHourlyInterestRate: string;
            _30dDailyInterestRate: string;
            _90dHourlyInterestRate: string;
            _90dDailyInterestRate: string;
            _180dHourlyInterestRate: string;
            _180dDailyInterestRate: string;
            minLimit: string;
            maxLimit: string;
            vipLevel: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanLoanableDataRequestResult = RequestResult<
  Request,
  GetSapiV1LoanLoanableDataResponse
>;

export function getSapiV1LoanLoanableData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanLoanableDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanLoanableDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanLoanableDataEndpointSchema,
    }),
    config
  );
}
