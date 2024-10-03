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

export type GetSapiV1LoanBorrowHistoryRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1LoanBorrowHistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LoanBorrowHistoryRequestResult = RequestResult<
  GetSapiV1LoanBorrowHistoryRequest,
  GetSapiV1LoanBorrowHistoryResponse
>;

export function getSapiV1LoanBorrowHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1LoanBorrowHistoryRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LoanBorrowHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1LoanBorrowHistoryEndpointSchema, payload),
    config
  );
}
