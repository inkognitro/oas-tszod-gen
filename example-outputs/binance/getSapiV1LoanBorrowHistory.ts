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

export const getSapiV1LoanBorrowHistoryEndpointSchema = {
  path: '/sapi/v1/loan/borrow/history',
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

export type GetSapiV1LoanBorrowHistoryPayload = {
  queryParams: {
    orderId?: number; // int
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

export type GetSapiV1LoanBorrowHistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            orderId: number; // int
            loanCoin: string;
            initialLoanAmount: string;
            hourlyInterestRate: string;
            loanTerm: string;
            collateralCoin: string;
            initialCollateralAmount: string;
            borrowTime: number; // int
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanBorrowHistoryRequestResult = RequestResult<
  Request,
  GetSapiV1LoanBorrowHistoryResponse
>;

export function getSapiV1LoanBorrowHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LoanBorrowHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanBorrowHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LoanBorrowHistoryEndpointSchema,
    }),
    config
  );
}
