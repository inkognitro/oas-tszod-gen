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

export const getSapiV2LoanFlexibleLoanableDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/loanable/data',
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

export type GetSapiV2LoanFlexibleLoanableDataPayload = {
  queryParams: {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleLoanableDataResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            rows: {
              loanCoin: string;
              flexibleInterestRate: string;
              flexibleMinLimit: string;
              flexibleMaxLimit: string;
            }[];
            total: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2LoanFlexibleLoanableDataRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleLoanableDataResponse
>;

export function getSapiV2LoanFlexibleLoanableData(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleLoanableDataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleLoanableDataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleLoanableDataEndpointSchema,
    }),
    config
  );
}
