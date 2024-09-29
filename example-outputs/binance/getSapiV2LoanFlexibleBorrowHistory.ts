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

export const getSapiV2LoanFlexibleBorrowHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/borrow/history',
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

export type GetSapiV2LoanFlexibleBorrowHistoryPayload = {
  queryParams: {
    loanCoin?: string;
    collateralCoin?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2LoanFlexibleBorrowHistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            loanCoin: string;
            initialLoanAmount: string;
            collateralCoin: string;
            initialCollateralAmount: string;
            borrowTime: number; // int
            status: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleBorrowHistoryRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleBorrowHistoryResponse
>;

export function getSapiV2LoanFlexibleBorrowHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleBorrowHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleBorrowHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleBorrowHistoryEndpointSchema,
    }),
    config
  );
}
