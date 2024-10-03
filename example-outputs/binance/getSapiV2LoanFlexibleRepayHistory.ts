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

export const getSapiV2LoanFlexibleRepayHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/repay/history',
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

export type GetSapiV2LoanFlexibleRepayHistoryRequest = RequestUnion<
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

export type GetSapiV2LoanFlexibleRepayHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            loanCoin: string;
            repayAmount: string;
            collateralCoin: string;
            collateralReturn: string;
            repayStatus: string;
            repayTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleRepayHistoryRequestResult = RequestResult<
  GetSapiV2LoanFlexibleRepayHistoryRequest,
  GetSapiV2LoanFlexibleRepayHistoryResponse
>;

export function getSapiV2LoanFlexibleRepayHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2LoanFlexibleRepayHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleRepayHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2LoanFlexibleRepayHistoryEndpointSchema, payload),
    config
  );
}
