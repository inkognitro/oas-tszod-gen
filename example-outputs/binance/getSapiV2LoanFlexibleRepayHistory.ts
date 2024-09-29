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

export const getSapiV2LoanFlexibleRepayHistoryEndpointSchema = {
  path: '/sapi/v2/loan/flexible/repay/history',
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

export type GetSapiV2LoanFlexibleRepayHistoryPayload = {
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

export type GetSapiV2LoanFlexibleRepayHistoryResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2LoanFlexibleRepayHistoryRequestResult = RequestResult<
  Request,
  GetSapiV2LoanFlexibleRepayHistoryResponse
>;

export function getSapiV2LoanFlexibleRepayHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2LoanFlexibleRepayHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2LoanFlexibleRepayHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2LoanFlexibleRepayHistoryEndpointSchema,
    }),
    config
  );
}
