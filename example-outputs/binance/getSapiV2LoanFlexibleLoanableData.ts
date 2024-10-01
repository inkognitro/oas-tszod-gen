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

export const getSapiV2LoanFlexibleLoanableDataEndpointSchema = {
  path: '/sapi/v2/loan/flexible/loanable/data',
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

export type GetSapiV2LoanFlexibleLoanableDataPayload = {
  queryParams: {
    loanCoin?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleLoanableDataResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

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
