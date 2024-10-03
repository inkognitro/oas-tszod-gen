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

export type GetSapiV2LoanFlexibleBorrowHistoryRequest = RequestUnion<
  any,
  any,
  {
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

export type GetSapiV2LoanFlexibleBorrowHistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleBorrowHistoryRequestResult = RequestResult<
  GetSapiV2LoanFlexibleBorrowHistoryRequest,
  GetSapiV2LoanFlexibleBorrowHistoryResponse
>;

export function getSapiV2LoanFlexibleBorrowHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleBorrowHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleBorrowHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleBorrowHistoryEndpointSchema, payload),
    config
  );
}
